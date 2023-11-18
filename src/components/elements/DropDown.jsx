import React,{useState,useMemo,useCallback} from 'react'

export default function DropDown(props){
    const [open,setOpen] = useState(false)

    const optionsHTML = useMemo(() => props.options.map((item) => {
        return <div className='hover:bg-slate-300 p-2 w-20' onClick={() => setDropDownOption(item)}>{item}</div>
    }), [props.options])

    const toggleDropDown = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    const setDropDownOption = useCallback((item) => {
        props.setSelectValue(item);
        setOpen(false);
    }, [props]);
    
    return(
        <div className='relative'>
            <div 
            onClick={toggleDropDown} 
            className='dropDownDisplay p-2 
            shadow-DropDown rounded w-20'>
                {props.selectedValue}
            </div>
            {open && <div className="absolute bg-white border-1">{optionsHTML}</div>}
        </div>
    )
}