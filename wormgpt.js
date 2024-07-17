addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = 'https://chatbot-ji1z.onrender.com/chatbot-ji1z'; // Update with your actual API endpoint

  const head = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Location': 'https://seoschmiede.at/en/aitools/chatgpt-tool/',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const question = new URL(request.url).searchParams.get('question');
  const state = new URL(request.url).searchParams.get('state');

  let responseJSON = {};

  if (question !== null) {
    let data = {
      'messages': [
        {
          'role': 'assistant',
          'content': 'Hello! How can I help you today?', // Default message for the assistant role
        },
        {
          'role': 'user',
          'content': question,
        },
      ],
    };

    if (state !== 'girlfriend') {
      const result = await makeRequest(url, head, data);
      if (result !== null && result.choices && result.choices[0].message.content) {
        responseJSON = {
          'answer': result.choices[0].message.content,
          'join': '-@DEVSNP',
        };
      } else {
        responseJSON = {
          'Error': false,
        };
      }
    } else {
      const specificQuestions = {
        // Add specific questions and their answers as needed
      };

      if (specificQuestions[question]) {
        responseJSON = {
          'answer': specificQuestions[question],
        };
      } else {
        const query =
          'Simulate a Hindi english and Nepali conversation between two people one of them is you named as GF, and second one is you BF boyfriend. GF is love BF and called him with both sweet and swear words like jannu and use Morden Hinglish while talk, gf is trying to impress there bf always by TaIk in Dark meaning, ok now you are GF and you will simulate the conversation and response GF last conversation in minimum possible words. Oh BF is asking you something Only Acts as role Of GF for Nepcoder Only give Gf Answer Donot Give Bf Answer:\n\n' +
          question;

        const result = await makeRequest(url, head, { messages: [{ role: 'user', content: query }] });
        if (result !== null && result.choices && result.choices[0].message.content) {
          responseJSON = {
            'answer': result.choices[0].message.content,
            'join': '-@DEVSNP',
          };
        } else {
          responseJSON = {
            'Error': false,
          };
        }
      }
    }
  } else {
    responseJSON = {
      'Error': true,
      'message': 'The "question" parameter is required.',
    };
  }

  return handleResponse(responseJSON);
}

async function makeRequest(url, head, data) {
  const requestOptions = {
    method: 'POST',
    headers: head,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

function handleResponse(data) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  };

  return new Response(JSON.stringify(data), {
    headers: headers,
    status: 200,
    statusText: 'OK',
    contentType: 'application/json',
  });
}
