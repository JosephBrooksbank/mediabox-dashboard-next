import { ChangeEventHandler } from "react";

interface ICheckboxProps {
    label: string;
    checked: boolean;
    setChecked: ( checked: boolean ) => void;
}

const Checkbox = ( props: ICheckboxProps ) => {

    const handleCheckboxInput: ChangeEventHandler<HTMLInputElement> = ( e ) => {
        props.setChecked( e.target.checked );
    };

    return (
        <div>
            <div className="form-check px-2">
                <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 mr-2 cursor-pointer"
                    type="checkbox" checked={props.checked} onChange={handleCheckboxInput}/>
                <label className="form-check-label inline-block text-white-800" htmlFor="flexCheckDefault">
                    {props.label}
                </label>
            </div>
        </div>
    )
}

export default Checkbox;