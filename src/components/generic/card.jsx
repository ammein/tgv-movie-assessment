

const Card = ({children}) => {
    return (
        <div className="!p-6 !gap-4 bg-black-10 rounded-xl border border-neutral-800 flex-col justify-start items-start inline-flex">{children}</div>
    )
}

export default Card;