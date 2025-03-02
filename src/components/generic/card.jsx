/**
 * Card Component
 * @param {JSX.Element} children
 * @param {string} classNames
 * @param {string | null} shadowSize
 * @param {JSX.ElementAttributesProperty} props
 * @returns {JSX.Element}
 * @constructor
 */
const Card = ({children, classNames = "", shadowSize = null, props}) => {
    return (
        <div className={`${shadowSize ? "shadow-" + shadowSize + " " : ""}!p-6 !gap-4 bg-black-10 rounded-xl border border-neutral-800 flex-col justify-start items-start inline-flex ${classNames}`} {...props}>{children}</div>
    )
}

export default Card;