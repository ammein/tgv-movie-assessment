/**
 * Card Component
 * @param {JSX.Element} children
 * @param {string | null} shadowSize
 * @returns {JSX.Element}
 * @constructor
 */
const Card = ({children, shadowSize = null}) => {
    return (
        <div className={`${shadowSize ? "shadow-" + shadowSize + " " : ""}!p-6 !gap-4 bg-black-10 rounded-xl border border-neutral-800 flex-col justify-start items-start inline-flex`}>{children}</div>
    )
}

export default Card;