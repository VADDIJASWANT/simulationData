import React, {useState} from "react";
import ColumnsDisplay from "./ColumnsDisplay";
import { saveAs } from "file-saver";
export default function Main(){
    const [table, setTable] = useState({tableName:'',columns:[]})
    function updateTableName(e){
        const html = e.target
        const updatedVal = $(html).val()
        setTable((prev) => {
            return{
                ...prev,
                tableName:updatedVal
            }
        })
    }
    function defaultColumn(){
        return{
            columnName: '',
            columnDatatype:'string',
            minLength: 1,
            maxLength: 50,
            canBeNull:false,
        }
    }

    function addColumnToTheTable(){
        const column = defaultColumn()
        setTable((prev) => {
            const newColumn = [...prev.columns,column]
            return{
                ...prev,
                columns:newColumn
            }
        })
    }
    function updateColumns(index,column){
        setTable((prev)=>{
            const newColumns = [...prev.columns]
            newColumns[index] = column
            return{
                ...prev,
                columns:newColumns
            }
        })
    }
    const columnsHtml = table.columns.map((column,index) => {
        return <ColumnsDisplay {...column} updateColumn={(newColumn) => updateColumns(index,newColumn)} />
    })
    function generatePDF(){
        // return should be in the format of { tableName: [{columnNam:value ....}(each obj a row) ...]}
        const rows = []
        console.log(table);
        for(let i=0;i<50;i++){
            const row = {};
            table.columns.forEach((item) => {
                let value
                switch(item.columnDatatype){
                    case 'string':
                        value = () => {
                            let result = '';
                            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            let charactersLength = characters.length;
                            let randLength = Math.round(Math.random() * 50)
                            for (let i = 0; i <= randLength; i++) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            return result;
                        }
                        break;
                    case 'integer':                       
                        value = () => Math.round(Math.random() * Math.pow(2,10))
                        break;
                    case 'boolean':
                        value = () => Math.random() >= 0.5
                        break;
                    case 'bit':
                        value = () => Math.round(Math.random());
                        break;
                }
                row[`${item.columnName}`] = value()
            })
            row.id = i
            rows.push(row)
        }
        const tableData = {
            [table.tableName]:rows
        }
        const data = JSON.stringify(tableData,null,2)
        var blob = new Blob([data], {type:'application/json'});
        saveAs(blob,"output.json")
    }
    return(
        <div className="flex-grow mt-10">
            <div className="h-full flex felx-col gap-5 w-3/5 m-auto">
                <div className="flex w-full items-center h-20 justify-between">
                    <input type="text" 
                    value={table.tableName} 
                    placeholder="Enter your table Name here"
                    className="w-4/5 h-full text-2xl focus:outline-none"
                    onChange={(e) => updateTableName(e)} 
                    />
                    <div
                        style={{borderRadius:'50%'}}
                        title='add row details' 
                        className="bg-blue-400 p-3 flex justify-center items-center"
                        onClick={addColumnToTheTable}
                    >
                            <span className="fa fa-plus text-2xl text-white"></span>
                    </div>                  
                </div>
            </div>
            {columnsHtml}
            {table.columns.length > 0 && <div className='flex justify-end w-3/5 m-auto mt-10'>
                <button
                onClick={generatePDF}
                className="rounded hover:bg-blue-300 p-2 shadow-DropDown"
                >Generate</button>
            </div>}
        </div>
    )
}