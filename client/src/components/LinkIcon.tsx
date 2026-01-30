

interface Props {
    link: string
}

function LinkIcon( { link } : Props){

    return (
        <div className={"flex flex-col items-start justify-start px-4"}>
            <div className={" flex justify-center items-center w-6"}>
                <img className={"rounded-lg"} src={`https://twenty-icons.com/${link.split("/")[2].split(":")[0]}`}/>
            </div>
        </div>
    )
}

export default LinkIcon