export default function Button(props){
    return(
        <button className="text-white text-xl mt-4 ml-2 mr-2 mb-4 p-2 bg-blue-500 rounded-md" type={props.type}>{props.name}</button>
    )
}