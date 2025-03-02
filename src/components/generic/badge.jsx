
/**
 * Badge Component
 * @param {string} title
 * @returns {JSX.Element}
 * @constructor
 */
const Badge = ({title}) => {
    return (
        <div className="h-fit !px-6 !py-2.5 bg-red-45 rounded-lg justify-start items-center gap-2.5 inline-flex">
            <h5 className="text-center text-white text-xl font-semibold font-manrope leading-[30px]">{title}</h5>
        </div>
    )
}

export default Badge;