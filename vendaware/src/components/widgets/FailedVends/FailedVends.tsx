import React, { Component } from "react";
import { XAxis, YAxis, Tooltip, LineChart, CartesianGrid, Line, Legend, ResponsiveContainer, DotProps } from 'recharts';
import { ResizableBox } from "react-resizable";
import { useAuth } from './../../Login/hooks/useAuth';
import { firestore } from "../../../Storage";
import css from "./FailedVends.module.scss";

export interface IGraphData {
    name: string;
    failed: number;
}
export interface FailedVendsProps {
    wid: string;
}

export interface FailedVendsHandlers {
    removeUserWidget: (wid: string) => void;
}
export interface IResult {
    field: number;
    failures: number;
}
export interface IResultMap {
    [month: number]: IResult[];
}
const FailedVends: React.FC<FailedVendsProps & FailedVendsHandlers> = (props): React.ReactElement => {

    const { user } = useAuth();


    const currentYear = new Date().getFullYear();
    const [year, setYear] = React.useState<number>(currentYear);
    const [month, setMonth] = React.useState<number>(0);
    const [graphData, setGraphData] = React.useState<IGraphData[]>([]);
    const [day, setDay] = React.useState<number>(0);
    const [yearFailedSalesData, setYearFailedSalesData] = React.useState<[]>([]);

    const closeComponent = () => {
        props.removeUserWidget(props.wid);
    }

    const formatMonth = (x: any) => {
        let gotMonth = x.name - 1;
        let newMonth = new Date();
        newMonth.setDate(1);
        newMonth.setMonth(gotMonth);
        let fMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(newMonth);
        return { ...x, name: fMonth };
    }

    const getAllFailedSalesData = async (year: number) => {
        //setYear(year);

        try {

            if (user === undefined || user === null) return;

            const ref = await firestore.collection('machine_rtotal').where("machine_id", "==", "2EXZU4p1Z5c6g0yKtnHh").where("year", "==", year).limit(1).get();

            if (ref.docs && ref.docs.length > 0) {
                const machineData = ref.docs[0].data();

                if (machineData) {
                    const failedSales = machineData.yearTotalBad;
                    const monthData = Object.keys(failedSales).map(key => ({ name: key, failed: failedSales[key] * (-1) }));
                    const data = monthData.map(formatMonth);
                    setGraphData(data);
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    const onYearChange = (year: number) => {
        let y = year ? year : 0;
        setYear(y);
        setMonth(0);             
        setDay(0);
    }

    React.useEffect(() => {

        getAllFailedSalesData(year);
    }, [year]);

    const getMonthData = async (cMonth: number) => {

        const dates = new Date(year, cMonth, 0).getDate();
        // Generate an array of days in a month
        const days = Array.from(Array(dates).keys()).map(m => m = m + 1);

        try {

            if (user === undefined || user === null) return;

            const ref = await firestore.collection('sales')
                .where("machineId", "==", "2EXZU4p1Z5c6g0yKtnHh")
                .where("orgId", "==", "7sjbVusdPupMNaCsVBad")
                .get();

            const result: IResultMap = {};

            result[cMonth] = days.map(d => ({ field: d, failures: 0 }));

            ref.docs.forEach(doc => {
                const sale = doc.data();

                for (const [sday, reply] of Object.entries(sale.monthData)) {

                    if (reply !== 'ok') {
                        const dd = new Date(parseInt(sday));
                        const y = dd.getFullYear();
                        const m = dd.getMonth() + 1; // month count starts from 0
                        const day = dd.getDate();

                        if (y === year && m === cMonth) {

                            const f = result[m].find(d => d.field === day);
                            if (f) {
                                f.failures++;
                            }

                        }
                    }
                }

            });

            const monthStatistics = result[cMonth].map(k => ({ name: k.field.toString(), failed: k.failures * (-1) }));
            setGraphData(monthStatistics);

        } catch (err) {
            console.log(err);
        }
    }

    const onMonthChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cMonth = parseInt(e.target.value);
        setMonth(cMonth);        
        setDay(0);
        if (cMonth !== 0) {
            getMonthData(cMonth);
        } else {
            getAllFailedSalesData(year);
        }
    }

    const getDayData = async (day: number) => {
        setDay(day);

        try {

            if (user === undefined || user === null) return;

            const ref = await firestore.collection('sales')
                .where("machineId", "==", "2EXZU4p1Z5c6g0yKtnHh")
                .where("orgId", "==", "7sjbVusdPupMNaCsVBad")
                .get();

            const hours = Array.from(Array(24).keys()).map(m => m = m + 1);
            const result: IResultMap = {};

            result[day] = hours.map(h => ({ field: h, failures: 0 }));

            ref.docs.forEach(doc => {
                const sale = doc.data();

                for (const [sday, reply] of Object.entries(sale.monthData)) {

                    if (reply !== 'ok') {
                        const dd = new Date(parseInt(sday));
                        const y = dd.getFullYear();
                        const m = dd.getMonth() + 1; // month count starts from 0
                        const dday = dd.getDate();
                        const hour = dd.getHours();

                        if (y === year && m === month && day === dday) {

                            const f = result[day].find(h => h.field === hour);
                            if (f) {
                                f.failures++;
                            }

                        }
                    }
                }

            });

            const monthStatistics = result[day].map(k => ({ name: `${k.field}h`, failed: k.failures * (-1) }));
            setGraphData(monthStatistics);

        } catch (err) {
            console.log(err);
        }
    }

    const handleDotClick = (props: DotProps, e: any) => {
        let dotName = e.payload.name;
        
        //const l = dotName.length - 1;
        //if (dotName.charAt(l) !== "h") {
            if (month === 0) {
                let dot = `5 ${dotName} ${year}`;
                let newDate = new Date(dot);
                let mnth = newDate.getMonth() + 1;
                setMonth(mnth);
                getMonthData(mnth);
            } else {
                const day = parseInt(dotName);
                getDayData(day);
            }
        //}
    }

    const generateMonths = () => {
        const months = Array.from(Array(12).keys()).map(k => k = k + 1);

        let gMonths: any = [];
        months.forEach(m => {
            let selMonth = new Date();
            selMonth.setDate(1);
            selMonth.setMonth(m - 1);
            let sMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selMonth);
            gMonths.push(sMonth);
        });
        return gMonths;
    }


    let selMonth;
    if (month !== 0) {
        selMonth = new Date().setMonth(month - 1);
        selMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selMonth);
    } else selMonth = '';

    let selDay = (day !== 0) ? day : '';

    let monthsArr = generateMonths();

    let options = monthsArr.map((m: number, key: number) => {
        return <option key={key + 1} value={key + 1}>{m}</option>
    });
    options.unshift(<option key="full" value="0" >Choose month</option>);

    return (

        <React.Fragment>
            <ResizableBox className={css.item} width={650} height={400} minConstraints={[350, 155]} maxConstraints={[1300, 700]}>
                <>
                    <div className={css.item_header}>
                        <p className={css.item_title}>Failed Vends</p>
                        <button className={css.item_close} onClick={closeComponent}>Close</button>
                    </div>

                    <div className={css.item_body}>

                        <nav>
                            <button onClick={() => { onYearChange(2020) }} className={(year === 2020) ? `${css.btn} ${css.btn_active}` : css.btn}>2020</button>
                            <button onClick={() => { onYearChange(2021) }} className={(year === 2021) ? `${css.btn} ${css.btn_active}` : css.btn}>2021</button>

                            <select className={css.field_select} name="month" id="month" value={month} onChange={onMonthChange}>
                                {options}
                            </select>

                        </nav>
                        <p><strong>Period: {selDay} {selMonth} {year} </strong></p>
                        <div>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={graphData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="failed" stroke="#F26157" activeDot={{ r: 6, onClick: handleDotClick }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </>
            </ResizableBox>
        </React.Fragment>
    );

}
export default FailedVends;
