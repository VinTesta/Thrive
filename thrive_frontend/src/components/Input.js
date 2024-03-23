export default function Input(props){
    return(
        <div className='flex flex-col'>
            <label className="text-white rounded-md">{props.label}</label>
            <span className="text-sm text-gray-200 text-xs">{props.description}</span>
            <input className="px-1 text-sm text-black rounded-md shadow-md " placeholder={props.placeholder}></input>
        </div>
    )
}