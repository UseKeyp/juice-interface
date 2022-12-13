const html = `<html lang="en">
  <head>
    <link
      rel="stylesheet"
      href="https://api.fonts.coollabs.io/css2?family=Overpass"
    />
    <link
      rel="icon"
      href="https://usekeyp.com/lib_EuhSXxjdIHnRGpWc/1losb3su6g1bq058.svg?w=224"
      type="image/svg+xml"
    />
    <title>Loading...</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #4f4f4f;
        .container {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
        }
      }
      h3 {
        color: white;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        margin: 0 auto;
        width: 100%;
        padding: 30px 0;
      }
      p {
        color: white;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        margin: 0 auto;
        width: 100%;
        padding: 30px 0;
      }
      .container {
        position: fixed;
        top: 40%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
      }
      .chest {
        margin: 0 auto;
        -webkit-animation: updown 2s infinite alternate;
        animation: updown 2s infinite alternate;
        &__body {
          width: 100%;
          height: 120px;
          -webkit-border-radius: 50% / 40% 40% 60% 60%;
          border-radius: 50% / 40% 40% 60% 60%;
        }
      }
      .shadow {
        width: 200px;
        height: 30px;
        margin: auto;
        margin-top: -20px;
        background: #000;
        opacity: 0.6;
        display: block;
        -webkit-border-radius: 100%;
        border-radius: 100%;
        -webkit-transform: translateY(60px);
        -ms-transform: translateY(60px);
        transform: translateY(60px);
        -webkit-filter: blur(17px);
        filter: blur(17px);
        -webkit-animation: shadow 2s infinite alternate;
        animation: shadow 2s infinite alternate;
      }

      @-webkit-keyframes updown {
        to {
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }
      }

      @keyframes updown {
        to {
          -webkit-transform: translateY(40px);
          transform: translateY(40px);
        }
      }

      @-webkit-keyframes shadow {
        from {
          width: 200px;
        }
        to {
          width: 150px;
        }
      }
      @keyframes shadow {
        from {
          width: 200px;
        }
        to {
          width: 150px;
        }
      }
    </style>
  </head>
  <body>
    <div id="timeoutError" style="display:none;"><h3>Oops! An error occured<br/><br/>Sending you back...</h3><p>The request took too long.</p></div>
    <div class="container">
      <div class="chest">
        <div class="chest__body">
          <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="none">
            <path fill="#005285" d="M95.557 9.725C66.624-8.713 28.162-.15 9.725 28.783-8.713 57.716-.15 96.18 28.783 114.616c28.933 18.437 67.396 9.874 85.833-19.059 18.437-28.933 9.874-67.395-19.059-85.832ZM84.302 76.222c-7.803 12.223-23.962 15.814-36.184 8.01-12.223-7.802-15.813-23.96-8.01-36.183 7.803-12.222 23.961-15.813 36.184-8.01C88.513 47.842 92.105 64 84.302 76.222Z"/>
            <path fill="#30B0FF" d="M27.471 94.59a4.253 4.253 0 0 1-3.314-1.588C7.03 72.01 10.207 41.006 31.2 23.88c13.465-10.979 31.97-14.017 48.268-7.94 2.21.828 3.383 3.314 2.555 5.524-.829 2.21-3.315 3.383-5.524 2.555-13.466-4.972-28.726-2.486-39.775 6.56-17.332 14.086-19.887 39.705-5.8 56.968a4.294 4.294 0 0 1-.622 6.077c-.828.621-1.795.967-2.693.967h-.138Z"/>
            <path fill="#27A4F2" d="M61.79 111.577a50.35 50.35 0 0 1-4.557-.207c-6.56-.621-12.844-2.486-18.644-5.593-2.072-1.105-2.9-3.729-1.796-5.87 1.105-2.071 3.73-2.9 5.87-1.795 4.764 2.555 9.943 4.074 15.399 4.627 10.772 1.036 21.268-2.279 29.623-9.184a4.35 4.35 0 0 1 6.077.552 4.35 4.35 0 0 1-.553 6.077c-8.907 7.388-19.887 11.393-31.35 11.393h-.069Z"/>
            <path fill="#1696E6" d="M100.736 88.652a4.28 4.28 0 0 1-2.21-.622c-2.071-1.174-2.762-3.867-1.519-5.938 4.074-6.974 6.008-14.915 5.525-22.995-.139-2.348 1.657-4.42 4.005-4.557 2.347-.138 4.419 1.657 4.557 4.005.622 9.736-1.726 19.404-6.698 27.897a4.37 4.37 0 0 1-3.729 2.14l.069.07Z"/>
            <path fill="#008CE3" d="M103.084 49.499a4.341 4.341 0 0 1-4.005-2.693 34.905 34.905 0 0 0-1.657-3.66c-1.105-2.14-.277-4.696 1.864-5.8 2.072-1.105 4.696-.276 5.8 1.864.76 1.45 1.451 2.9 2.003 4.42.898 2.21-.207 4.695-2.417 5.593a4.282 4.282 0 0 1-1.588.276Z"/>
            <path fill="#0078C2" d="M91.414 32.788c-1.726 0-3.383-1.036-4.005-2.762a.527.527 0 0 0-.138-.345c-.69-2.348.552-4.765 2.831-5.455 2.279-.69 4.765.621 5.524 2.9.69 2.14-.483 4.557-2.624 5.386-.483.207-1.036.276-1.519.276h-.069Z"/>
</svg>

        </div>
      </div>
      <div class="shadow"></div>
    </div>
    <script>
      console.log('%Keyp', 'color:#88C54B;font-family:sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold');
      setTimeout(() => {
        const staticImageSrc = document.getElementById("timeoutError").src
        document.getElementById("timeoutError").style = "";
        setTimeout(() => {
          window.close()
        },2000)
      },10000)
    </script>
  </body>
</html>
`
export default html
