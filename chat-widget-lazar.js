(function() {
  document.head.insertAdjacentHTML('beforeend', '<link href="https://mediu.s3.eu-central-1.amazonaws.com/tailwind.min.css" rel="stylesheet">');

  // Inject the CSS
  const style = document.createElement('style');
  style.innerHTML = `
  .hidden {
    display: none;
  }
  .active{
    background:#000;
  }
  #chat-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    flex-direction: column;
    z-index:9999;
  }
  #chat-popup {
    height: 70vh;
    max-height: 70vh; 
    transition: all 0.3s;
    overflow:hidden;
    width: 800px;
  }
  .chat-body{
    overflow-y:hidden;
    overflow-x:hidden;
    min-height:0;
    max-height: 575px;
    height: 575px;
  }
  .ant-list-items{display:none;}
  @media (max-width: 768px) {
    #chat-popup {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
    .chat-body{
      height:calc(100% - 56px);
      max-height:calc(100% - 56px);
    }
  }
  `;

  document.head.appendChild(style);

  // Create chat widget container
  const chatWidgetContainer = document.createElement('div');
  chatWidgetContainer.id = 'chat-widget-container';
  document.body.appendChild(chatWidgetContainer);
  
  // Inject the HTML
  chatWidgetContainer.innerHTML = `
    <div id="chat-bubble" class="w-16 h-16 bg-gray-800 rounded-md flex items-center justify-center cursor-pointer text-3xl">
      <svg width="35" height="35" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.4999 38.5937C30.1537 38.5957 27.8435 38.0163 25.7759 36.9073C23.7084 35.7983 21.9478 34.1942 20.6516 32.2385L24.0357 29.9891C24.9623 31.3858 26.2201 32.5314 27.6969 33.3239C29.1738 34.1164 30.8238 34.5312 32.4999 34.5312C34.176 34.5312 35.826 34.1164 37.3028 33.3239C38.7797 32.5314 40.0375 31.3858 40.9641 29.9891L44.3482 32.2385C43.052 34.1942 41.2914 35.7983 39.2238 36.9073C37.1563 38.0163 34.8461 38.5957 32.4999 38.5937Z" fill="white"/>
        <path d="M40.625 16.25C39.8215 16.25 39.0361 16.4882 38.368 16.9346C37.6999 17.381 37.1792 18.0155 36.8717 18.7578C36.5643 19.5001 36.4838 20.317 36.6406 21.105C36.7973 21.8931 37.1842 22.6169 37.7524 23.1851C38.3205 23.7532 39.0444 24.1401 39.8324 24.2969C40.6205 24.4536 41.4373 24.3732 42.1797 24.0657C42.922 23.7582 43.5565 23.2375 44.0028 22.5695C44.4492 21.9014 44.6875 21.1159 44.6875 20.3125C44.6928 19.7775 44.5913 19.2469 44.389 18.7516C44.1867 18.2563 43.8877 17.8064 43.5094 17.4281C43.1311 17.0498 42.6811 16.7508 42.1859 16.5485C41.6906 16.3462 41.16 16.2447 40.625 16.25Z" fill="white"/>
        <path d="M24.375 16.25C23.5715 16.25 22.7861 16.4882 22.118 16.9346C21.4499 17.381 20.9292 18.0155 20.6217 18.7578C20.3143 19.5001 20.2338 20.317 20.3906 21.105C20.5473 21.8931 20.9342 22.6169 21.5024 23.1851C22.0705 23.7532 22.7944 24.1401 23.5824 24.2969C24.3705 24.4536 25.1873 24.3732 25.9297 24.0657C26.672 23.7582 27.3065 23.2375 27.7528 22.5695C28.1992 21.9014 28.4375 21.1159 28.4375 20.3125C28.4428 19.7775 28.3413 19.2469 28.139 18.7516C27.9367 18.2563 27.6377 17.8064 27.2594 17.4281C26.8811 17.0498 26.4311 16.7508 25.9359 16.5485C25.4406 16.3462 24.91 16.2447 24.375 16.25Z" fill="white"/>
        <path d="M36.0258 60.9375L32.5 58.9062L40.625 44.6875H52.8125C53.3463 44.6884 53.8749 44.584 54.3682 44.3801C54.8615 44.1763 55.3097 43.8771 55.6871 43.4996C56.0646 43.1222 56.3638 42.674 56.5676 42.1807C56.7715 41.6874 56.8759 41.1588 56.875 40.625V12.1875C56.8759 11.6537 56.7715 11.1251 56.5676 10.6318C56.3638 10.1385 56.0646 9.69027 55.6871 9.31285C55.3097 8.93543 54.8615 8.63622 54.3682 8.43239C53.8749 8.22855 53.3463 8.12409 52.8125 8.125H12.1875C11.6537 8.12409 11.1251 8.22855 10.6318 8.43239C10.1385 8.63622 9.69027 8.93543 9.31285 9.31285C8.93543 9.69027 8.63622 10.1385 8.43239 10.6318C8.22855 11.1251 8.12409 11.6537 8.125 12.1875V40.625C8.12409 41.1588 8.22855 41.6874 8.43239 42.1807C8.63622 42.674 8.93543 43.1222 9.31285 43.4996C9.69027 43.8771 10.1385 44.1763 10.6318 44.3801C11.1251 44.584 11.6537 44.6884 12.1875 44.6875H30.4688V48.75H12.1875C11.1205 48.7502 10.0638 48.5402 9.07798 48.1319C8.09212 47.7236 7.19635 47.1252 6.44184 46.3707C5.68733 45.6161 5.08885 44.7204 4.6806 43.7345C4.27235 42.7487 4.06231 41.692 4.0625 40.625V12.1875C4.06218 11.1204 4.27212 10.0637 4.68033 9.07782C5.08853 8.0919 5.687 7.19608 6.44154 6.44154C7.19608 5.687 8.0919 5.08853 9.07782 4.68033C10.0637 4.27212 11.1204 4.06218 12.1875 4.0625H52.8125C53.8796 4.06218 54.9363 4.27212 55.9222 4.68033C56.9081 5.08853 57.8039 5.687 58.5585 6.44154C59.313 7.19608 59.9115 8.0919 60.3197 9.07782C60.7279 10.0637 60.9378 11.1204 60.9375 12.1875V40.625C60.9377 41.692 60.7277 42.7487 60.3194 43.7345C59.9111 44.7204 59.3127 45.6161 58.5582 46.3707C57.8036 47.1252 56.9079 47.7236 55.922 48.1319C54.9362 48.5402 53.8795 48.7502 52.8125 48.75H42.9906L36.0258 60.9375Z" fill="white"/>
      </svg>

    </div>
    <div id="chat-popup" class="hidden absolute bottom-20 right-20 w-96 bg-white rounded-lg shadow-xl flex flex-col transition-all text-sm">
      <div id="chat-header" class="flex justify-between items-center p-4 bg-black text-white rounded-t-md">
        <h3 class="m-0 text-sm uppercase">Asistent virtual</h3>
        <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
	<div class="chat-body mb-4 ml-5">
	    <div class="absolute top-16 right-2 pr-4">
      <p class="text-xs flex justify-end">
       <span class="text-gray-400">powered by</span><span class="ml-1 text-gray-700">invergent.io</span>
      </p>
    </div>
		<iframe
		    src="https://app-ragflow-evhub-2q7ny.eu-central-1.statemesh.net/chat/share?shared_id=01cd49a65d6f11f0b1d5b6829c6a26b0&from=chat&auth=cwNDlkNGM0NWQ3MTExZjBhOGFjYjY4Mj&visible_avatar=1"
		    style="width: 100%; height: 100%; man-height: 575px; min-height: 0;"
		    frameborder="0">
	    </iframe>
    </div>
        <style type="text/css">
          .ant-list-items{display:none;}
        </style>
    </div>
  `;

  const chatBubble = document.getElementById('chat-bubble');
  const closePopup = document.getElementById('close-popup');

  chatBubble.addEventListener('click', function() {
    togglePopup();
  });

  closePopup.addEventListener('click', function() {
    togglePopup();
  });

  function togglePopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.toggle('hidden');
    chatBubble.classList.toggle('active')
    console.log('ok ', document.getElementById('iframe'));
  }
})();


