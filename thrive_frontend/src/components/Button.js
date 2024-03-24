export default function Button(props){
    return(
        <button onClick={props.onClick} className="w-1/5 select-none rounded-sm text-[#f0f0f0] text-xl mt-4 ml-2 mr-2 mb-4 p-2 bg-[#191970] transition-all hover:opacity-90 hover:bg-[#c6c6c6] hover:text-[#191970] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type={props.type}>{props.name}</button>
        // select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none

    )
}