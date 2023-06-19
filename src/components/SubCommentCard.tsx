
const SubCommentCard = () => {
    return (
        <div className="flex gap-8 mb-10">
            <div className="flex flex-col gap-2 mt-8">
                <img className="w-24 rounded-full aspect-square" src="/img/buncha.jpg"/>
                <p className="font-bold">Username</p>
            </div>
            <div className="w-full min-h-[8rem] bg-white rounded-2xl px-10 py-5 relative">
                <div className="mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore, at ullam molestiae libero, 
                    quos officiis odit sequi nemo aut harum beatae exercitationem nisi earum culpa sint nostrum quo 
                    nobis?
                </div>
                <div><p className="font-thin text-mainShade text-sm">Commented on 12/08/2022</p></div>
            </div>
        </div>
    )
}

export default SubCommentCard;