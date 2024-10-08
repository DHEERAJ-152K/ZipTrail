import { useState } from "react";

const Shortner = () => {
  const [Url, setUrl] = useState(""); //useState hook to store input longURL
  const [output, setOutput] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const longUrl = Url.trim();

  //URL validator
  function isValidUrl(string: any) {
    try {
      const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
      return regex.test(string);
    } catch (_) {
      return false;
    }
  }

  //function to handle the submitted form data
  const handleLink = async (e: any) => {
    e.preventDefault();
    // console.log(longUrl);

    //data fetching using Fetch API
    try {
      if (!isValidUrl(longUrl)) {
        alert("Invalid URL! Try again..");
      } else {
        setIsLoading(true); 
        const response = await fetch("https://zt-vkan.onrender.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        });

        const result = await response.json();
        // console.log(result.shortUrl);

        // Handle success scenario

        if (result) {
          setOutput(result.shortUrl);
          setCopySuccess(false);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error scenario
    }
  };
  
  //function to handle copy-to-clipboard.
  const handleCopy = async (e: any) => {
    e.preventDefault();
    if (output) {
      navigator.clipboard.writeText(output).then(
        () => {
          setCopySuccess(true);
        },
        (err) => {
          console.error("Failed to copy..", err);
          setCopySuccess(false);
        }
      );
    }
  };

  return (
    <div className=" border border-black rounded-xl p-2 lg:p-5 max-w-xl h-auto shadow-xl shadow-gray-300 ">
      <form
        onSubmit={handleLink}
        className="w-full grid grid-cols-1 gap-2 h-full"
      >
        <input
          type="text"
          placeholder="Enter long url here"
          className="m-auto input input-bordered w-full rounded-xl bg-transparent border-black text-black"
          value={longUrl}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-between w-full m-auto">
          <div className="badge badge-outline w-full py-6 rounded-xl flex justify-start border-black text-base text-slate-400 overflow-hidden">
            {output ? (
              <p className="text-black">{output}</p>
            ) : (
              "Get your short url "
            )}
          </div>

          
          <button
            onClick={handleCopy}
            
            className={ output ? "rounded-xl bg-orange-500 hover:bg-orange-400 text-black btn btn-xl ml-2 md: p-3" : "rounded-xl cursor-not-allowed bg-slate-200 hover:bg-none text-black btn btn-xl ml-2 md: p-3"}
          >
            {copySuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check2"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="m-auto rounded-xl bg-orange-500 hover:bg-orange-400 text-black btn btn-xl w-full"
        >
         {(isLoading)?'Please wait...': 'Get your short Link !'}
        </button>
      </form>
    </div>
  );
};

export default Shortner;
