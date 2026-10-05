import { useActionState, useRef, useState } from "react"
import { fetchUrl, shortenUrl } from "../apis/endpoints.js";
import Toast from "../components/Toast.jsx";

const Home = () => {

    const urlRef = useRef(null);
    const lengthRef = useRef(null);
    const codeRef = useRef(null);
    const [tool, setTool] = useState("Shorten");
    const [toast, setToast] = useState({
        visible: false,
        message: ""
    })

    const handleTool = () => {
        if(tool === "Shorten"){
            setTool("Fetch");
        }
        else{
            setTool("Shorten");
        }
    }

    const postUrl = async () => {
        if(lengthRef.current.value < 1 || lengthRef.current.value > 20){
            setToast({
                visible: true,
                message: "entered length is not applicable."
            })
        } 
        else if(urlRef.current.value === null || urlRef.current.value.trim() === ""){
            setToast({
                visible: true,
                message: "entered url is not applicable."
            })
        }
        else{
            const response = await shortenUrl(urlRef.current.value, lengthRef.current.value);
            urlRef.current.value = "";
            lengthRef.current.value = "";
            console.log(`url shortened successfully, link: ${response.data}`);
        }
    }

    const getUrl = async () => {
        if(codeRef.current.value.trim() === "" || codeRef.current.value === null){
            setToast({
                visible: true,
                message: "entered url is not applicable."
            })
        }
        else{
            const response = await fetchUrl(codeRef.current.value);
            console.log(response.data);
            codeRef.current.value = "";
        } 
    }

    return(
        <div className="relative">
            <Toast toastBlock={toast.visible} toastMessage={toast.message}/>
            <div className="bg-obsidian-green min-h-screen px-28 py-12 flex flex-col items-center">
                <div>
                    <p className="font-mono text-4xl font-bold text-warm-white">Dwarf - URL shortener</p>
                </div>
                <div className="flex gap-4 mt-20 items-center">
                    <p className="text-sage-gray font-mono text-xl">What you want to do?</p>
                    <button  className="bg-jade text-obsidian-green px-4 py-1.5 font-mono hover:bg-[#8BE8BD] duration-300" onClick={handleTool}>{tool}</button>
                </div>
                <div className={`${tool === "Shorten" ? "block" : "hidden"} mt-10 flex flex-col gap-4`}>
                    <div className="flex flex-col gap-4 min-w-96">
                        <input ref={urlRef} type="text" placeholder="enter link" className="bg-pine border w-full border-dark-sage text-warm-white outline-0 focus:border-jade/80 transition-all duration-300 px-4 py-1.5 font-mono"/>
                        <input ref={lengthRef} type="number" placeholder="enter length" className="bg-pine border w-full border-dark-sage text-warm-white outline-0 focus:border-jade/80 transition-all duration-300 px-4 py-1.5 font-mono"/>
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="bg-[#111A16] border border-dark-sage text-warm-white hover:bg-pine hover:border-jade duration-300 px-4 py-1 font-mono" onClick={postUrl}>shorten</button>
                    </div>  
                </div>
                <div className={`${tool === "Shorten" ? "hidden" : "block"} mt-10 min-w-96 flex flex-col gap-4 items-center`}>
                    <input ref={codeRef} type="text" placeholder="enter short_id" className="bg-pine border border-dark-sage text-warm-white outline-0 focus:border-jade/80 transition-all duration-300 w-full px-4 py-1.5 font-mono"/>
                    <div>
                        <button className="bg-[#111A16] border border-dark-sage text-warm-white hover:bg-pine hover:border-jade duration-300 px-4 py-1 font-mono" onClick={getUrl}>fetch</button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Home