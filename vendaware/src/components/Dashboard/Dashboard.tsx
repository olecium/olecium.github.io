import React from "react";
import VendEfficiency from './../widgets/VendEfficiency/VendEfficiency';
import css from "./Dashboard.module.scss";
import { v4 as uuidv4 } from 'uuid';
import FailedVends from "components/widgets/FailedVends/FailedVends";

export interface IWidget {
    type: string;
    id: string;
}

const Dashboard: React.FC = (): React.ReactElement => {
   
    const [addGraphicMenu, setAddGraphicMenu] = React.useState<boolean>(false);
    const [userWidgets, setUserWidgets] = React.useState<IWidget[]>([]);
    const [widgetsList, setWidgetsList] = React.useState<string[]>([]);
    const [graphic, setGraphic] = React.useState<Array<JSX.Element|undefined>>([]);

    React.useEffect(() => {
        const widgets = ['Vend Efficiency', 'Failed Vends'];
        setWidgetsList(widgets);
        
    }, []);

    React.useEffect(() => {
        
        const graph = userWidgets.map(uw => {
            let type = uw.type;
            const graphicType = type.replace(/ +/g, "");
            const gr = getComponentByName(uw.id, graphicType);
            return gr;
        });

        setGraphic(graph);
    }, [userWidgets]);

    React.useEffect(() => {        
        const uwidgets: IWidget|[] = [];//{ type: 'FailedVends', id: '1234254' }
        setUserWidgets(uwidgets);
    }, []);

    const onAddGraphic = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setAddGraphicMenu(!addGraphicMenu);
    }

    const addGraph = (e: React.MouseEvent<HTMLElement>, graph: string) => {
        e.preventDefault();
        const widgetId = uuidv4();
        const graphicType = graph.replace(/ +/g, "");

        const uWidgets = [
            ...userWidgets, 
            {
                id: widgetId,
                type: graphicType
            }
        ];
        setUserWidgets(uWidgets);
        setAddGraphicMenu(!addGraphicMenu);
    }

    const removeUserWidget = (wId: string) => {
        const uWidgets = [...userWidgets.filter(p => p.id !== wId)];
        setUserWidgets(uWidgets);
    }

    const getComponentByName = (id: string, graph: string) => {
        switch(graph){
            case 'VendEfficiency': return <VendEfficiency key={id} wid={id} removeUserWidget={removeUserWidget}/>;
            case 'FailedVends': return <FailedVends key={id} wid={id} removeUserWidget={removeUserWidget}/>;
            default: return;
        }
        //throw new Exception("Graph type not defined");
    }

    return(
        <div>            
            <h1 className={css.primary_title}>Dashboard</h1>
        
            <div className={css.dashboard_wrapper}>
                <div className="panel">
                    <button className={css.btn} onClick={onAddGraphic}>Add graphic +</button>
                </div>
                {addGraphicMenu &&
                <ul className={css.add_graph_nav}>
                    {
                        widgetsList.map(wd => {
                            return(
                                <li key={wd}><button onClick={(e) => {addGraph(e, wd)}}>{wd}</button></li>
                            );
                        })
                    }
                </ul>
                }
                <div className={css.dashboard}>
                    { graphic }
                </div>
            </div>
        </div>
    );
}
export default Dashboard;