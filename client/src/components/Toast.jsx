import { useState } from "react";

const Toast = ({toastBlock, toastMessage}) => {

    return (
        <div className=
        {`text-warm-white absolute sm:max-w-96 max-w-72 bg-obsidian-green/60 -right-104 sm:-right-96 transition-all font-mono border-2 border-jade top-20 px-6 py-2 ${toastBlock ? '-translate-x-108' : 'translate-x-0'
        }
        `}>
            {toastMessage}
        </div>
    )
}

export default Toast;