import React from "react";
import {XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer} from 'recharts';
import css from "./VendEfficiency.module.scss";
import {ResizableBox} from "react-resizable";
import { useAuth } from "components/Login/hooks/useAuth";
import { firestore } from "Storage";

export interface IGraphData{
    name: string;
    good: number;
    failed: number;
}
export interface IVendEfficiencyProps {
    wid: string;
}
export interface IVendEfficiencyHandlers {
    removeUserWidget: (wid: string) => void;
}

const VendEfficiency: React.FC<IVendEfficiencyProps & IVendEfficiencyHandlers> = (props): React.ReactElement => {

    const {user} = useAuth();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = React.useState<number>(currentYear);
    const [month, setMonth] = React.useState<number>(0);
    const [graphData, setGraphData] = React.useState<IGraphData[]>([]);
    
    const removeUserWidget = () => {
        props.removeUserWidget(props.wid);
    }

    const getYearVendEfficiency = async (year: number, month: number) => {
        let dataName = '';
        
        if(month > 0) {
            setMonth(month);
            dataName = month.toString();
        } else {
            dataName = year.toString();
        }

        try {

            if(user === undefined || user === null) return;
            //const machineSnapshot = await firestore.collection('machine_rtotal').doc("2EXZU4p1Z5c6g0yKtnHh").get();
            //const machineData = machineSnapshot.data();
            const ref = await firestore.collection('machine_rtotal').where("machine_id", "==", "2EXZU4p1Z5c6g0yKtnHh").where("year", "==", year).limit(1).get();
            if (ref.docs && ref.docs.length > 0) {
                const machineData = ref.docs[0].data();
                
                if(machineData){
                    let totalGood = 0;
                    let totalBad = 0;

                    if(month > 0){            
                        totalGood = machineData.yearTotalGood[month];
                        totalBad = machineData.yearTotalBad[month];
                    } else {
                    
                        for(const key of Object.keys(machineData.yearTotalGood)){
                            const value: number = machineData.yearTotalGood[key];
                            totalGood += value;
                        }
                    
                        for(const key of Object.keys(machineData.yearTotalBad)){
                            const value: number = machineData.yearTotalBad[key];
                            totalBad += value;
                        }
                    }                

                    const totalVends = totalGood + totalBad;
                    let goodVendsPercentage = Math.round((100 * totalGood) / totalVends);
                    let failedVendsPercentage = Math.round((100 * totalBad) / totalVends);

                    const data = [
                        { name: dataName, good: goodVendsPercentage, failed: failedVendsPercentage }
                    ];

                    setGraphData(data);
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    React.useEffect( () => {
        getYearVendEfficiency(year, month);
    }, [year, month]);

    const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement >): void => {
        let m = parseInt(e.target.value) as number;
        setMonth(m);
    }

    const onYearChange = (e: React.MouseEvent<HTMLElement>, yr: number): void => {
        e.preventDefault();
        setYear(yr); 
        setMonth(0);
    }


    const generateMonths = () => {
        const months = Array.from(Array(12).keys()).map(k => k=k+1);

        let gMonths:any = [];
        months.forEach( m => {
            let selMonth = new Date();
            selMonth.setDate(1);
            selMonth.setMonth(m - 1);
            const sMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(selMonth);
            gMonths.push(sMonth);
        });
        return gMonths;
    }


    let monthsArr = generateMonths();

    let options = monthsArr.map((e:any, key:any) => {
        return <option key={key+1} value={key+1}>{e}</option>
    });
    options.unshift(<option key="full" value="0" >Choose month</option>);

    let sMonth = new Date();
    sMonth.setDate(1);
    sMonth.setMonth(month - 1);
    let periodMonth = month === 0 ? '' : new Intl.DateTimeFormat('en-US', {month: 'long'}).format(sMonth);
    const period = periodMonth !== '' ? `(${periodMonth}, ${year})` : `(${year})`

    return (
        <React.Fragment>
            <ResizableBox className={css.item} width={650} height={230} minConstraints={[350, 230]} maxConstraints={[1300, 230]}>
                <>
                    <div className={css.item_header}>
                        <p className={css.item_title}>Vend Efficiency <small>{period}</small></p>
                        <button className={css.item_close} onClick={removeUserWidget}>Close</button>
                    </div>

                    <div className={css.item_body}>

                        <div>
                            <button className={(year === 2020)? `${css.btn} ${css.btn_active}` : css.btn} onClick={(e) => {onYearChange(e, 2020)}}>2020</button>
                            <button className={(year === 2021)? `${css.btn} ${css.btn_active}` : css.btn} onClick={(e) => {onYearChange(e, 2021)}}>2021</button>

                            <select className={css.field_select} name="month" id="month" value={month} onChange={onMonthChange}>
                                {options}
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={150}>
                        <BarChart
                            data={graphData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            layout="vertical"
                        >
                            <XAxis type="number" tick={{fontSize: '11px'}} tickCount={11} tickFormatter={t=>t+"%"}/>
                            <YAxis dataKey="name" tick={{fontSize: '11px'}} type="category" />
                            <Tooltip />
                            <Bar dataKey="good" fill="#387908" stackId="sales"  />
                            <Bar dataKey="failed" fill="#ff7300" stackId="sales"  />
                        </BarChart>
                        </ResponsiveContainer>

                    </div>
                </>

            </ResizableBox>
        </React.Fragment>
    );
    
}
export default VendEfficiency;
