import CustomNavbar from "./CustomNavbar";

export default function Base({children}) {
    return (
        <div>
            <CustomNavbar />
            {children}
        </div>
    )
}