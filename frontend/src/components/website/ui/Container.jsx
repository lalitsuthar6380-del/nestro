export default function Container({ children, classname = '' }) {
    return (
        <div className={`max-w-7xl mx-auto px-4 md:px-8 ${classname}`}>
            {children}
        </div>
    )
}
