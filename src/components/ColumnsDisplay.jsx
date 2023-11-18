import React,{useEffect, useState} from "react";
import DropDown from './elements/DropDown.jsx'
import { data } from "autoprefixer";
export default function ColumnsDisplay(props){
    //updateColumn
    const [columnName,setcolumnName] = useState(props.columnName)
    const[dataType,setDataType] = useState(props.columnDatatype)
    function updateColunName(e){
        setcolumnName(e.target.value)
    }

    useEffect(()=>{
        const newColumnDetails = {
            columnName: `${columnName}`,
            columnDatatype:`${dataType}`,
            minLength: 1,
            maxLength: 50,
            canBeNull:false,
        }
        props.updateColumn(newColumnDetails)
    },[columnName,dataType])

    return(
        <div className="flex felx-col gap-5 w-3/5 h-12 items-center m-auto">
            <div className="w-3/4">
                Column Name:
                <input
                 onChange={(e) => updateColunName(e)}
                 className="focus:outline-none" value={columnName} />
            </div>
            <div className="flex w-1/4 gap-5 justify-end items-center">
                DataType
                <DropDown 
                options={['string','integer','boolean','bit']}
                selectedValue = {dataType}
                setSelectValue = {setDataType}
                />
            </div>
        </div>
    )
}