import { request, gql } from 'graphql-request'
import { graphqlServerEndpoint } from '@/config'

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: '.*' }
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })

  chrome.webRequest.onCompleted.addListener(storeUrls, { urls: ['<all_urls>'] })
  chrome.alarms.onAlarm.addListener(sendUrls)

  chrome.alarms.create('send-url-alarm', {
    periodInMinutes: 0.1
  })
})

function storeUrls (details) {
  let urls = [graphqlServerEndpoint]
  chrome.storage.local.get(['urls'], function (savedUrls) {
    if (savedUrls != null && savedUrls.urls != null) {
      urls = [...savedUrls.urls.map(url => url.url), ...urls]
    }
    const isRequestedUrlWhitelisted = urls.map(url => url.replace('.', '\\.').replace('*', '.*')).some(url => details.url.match(url))
    if (isRequestedUrlWhitelisted) {
      return
    }

    chrome.storage.local.get(['requests'], function (savedRequests) {
      let requests = [details]
      if (savedRequests != null && savedRequests.requests != null) {
        requests = [...savedRequests.requests, ...requests]
      }
      chrome.storage.local.set({ requests })
    })
  })
}

function sendUrls () {
  const mutation = gql`
  mutation insert_requests($requests: [requests_insert_input!]!) {
    insert_requests (
      objects: $requests
    )  {
      returning {
        id
      }
    }
  }
`

  chrome.storage.local.get(['requests'], function (savedRequests) {
    if (savedRequests == null || savedRequests.requests == null) {
      return
    }

    const data = savedRequests.requests.map(request => {
      return {
        url: request.url,
        request_id: request.requestId,
        executed_at: request.timeStamp,
        status_code: request.statusCode,
        status_line: request.statusLine,
        method: request.method
      }
    })

    request(graphqlServerEndpoint, mutation, { requests: data }).then(
      function (result) {
        chrome.storage.local.set({ requests: [] })
        chrome.storage.local.get(['count_requests'], function (savedCountRequests) {
          let countRequests = result.insert_requests.returning.length
          if (savedCountRequests != null && savedCountRequests.count_requests != null) {
            countRequests += savedCountRequests.count_requests
          }
          chrome.storage.local.set({ count_requests: countRequests })
        })
      }
    )
  })
}
