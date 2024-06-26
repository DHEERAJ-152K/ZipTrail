import { useState } from "react";

const Shortner = () => {
  const [Url, setUrl] = useState(""); //useState hook to store input longURL
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const longUrl = Url.trim();

  //URL validator
  function isValidUrl(string: any) {
    try {
      if (string.includes(" ")) {
        return false;
      }
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  //function to handle the submitted form data
  const handleLink = async (e: any) => {
    e.preventDefault();
    console.log(longUrl);

    //data fetching using Fetch API
    try {
      if (!isValidUrl(longUrl)) {
        alert("Invalid URL! Try again..");
      } else {
        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        });

        const result = await response.json();
        console.log(result.shortUrl);
        // Handle success scenario

        if (result) {
          setOutput(result.shortUrl);
          setCopySuccess(false);
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
      <form onSubmit={handleLink} className="w-full grid grid-cols-1 gap-2 h-full">
        <input
          type="text"
          placeholder="Enter long url here"
          className="m-auto input input-bordered w-full rounded-xl bg-transparent border-black text-black"
          value={longUrl}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-between w-full m-auto">
          <div className="badge badge-outline w-full py-6 rounded-xl flex justify-start border-black text-base text-slate-400">
            {output? <p className="text-black">{output}</p>:"Your short url " }
          </div>
          <button
            onClick={handleCopy}
            className="rounded-xl bg-orange-500 hover:bg-orange-400 text-black btn btn-xl ml-2"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          type="submit"
          className="m-auto rounded-xl bg-orange-500 hover:bg-orange-400 text-black btn btn-xl w-full"
        >
          Get your Link
        </button>
      </form>
    </div>
  );
};

export default Shortner;
