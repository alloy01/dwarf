import { useActionState, useRef } from "react"
import { fetchUrl, shortenUrl } from "../apis/endpoints.js";

const Home = () => {

    const urlRef = useRef(null);
    const lengthRef = useRef(null);
    const codeRef = useRef(null);

    const postUrl = async () => {
        if(lengthRef.current.value < 1 || lengthRef.current.value > 20){
            console.log("the entered length is not applicable");
        } 
        else if(urlRef.current.value === null || urlRef.current.value.trim() === ""){
            console.log("the entered url is not applicable");  
        }
        else{
            const response = await shortenUrl(urlRef.current.value, lengthRef.current.value);
            urlRef.current.value = "";
            lengthRef.current.value = "";
            console.log(`url shortened successfully, link: ${response.data}`);
        }
    }

    const getUrl = async () => {
        const response = await fetchUrl(codeRef.current.value);
        console.log(response);
    }

    return(
        <div className="flex flex-col max-w-96 gap-10">
            <div>
                <input ref={urlRef} type="text" placeholder="enter link" className="border border-slate-950 outline-0 px-4 py-1 font-semibold"/>
                <input ref={lengthRef} type="number" placeholder="enter length" className="border border-slate-950 outline-0 px-4 py-1 font-semibold"/>
            </div>
            <div>
                <input ref={codeRef} type="text" placeholder="enter short_id" className="border border-slate-950 outline-0 px-4 py-1 font-semibold"/>
            </div>
            <button className="border border-slate-950 py-1 font-semibold bg-green-600" onClick={postUrl}>shorten</button>        
        </div>
    )
}

export default Home