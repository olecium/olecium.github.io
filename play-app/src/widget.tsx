export enum WidgetType {
	FailedVends, 
	VendEfficiency
}
export interface IWidget {
	type: WidgetType,
	uid: string
}
export interface IWidgetMap {
	[uid: string]: IWidget
}
const widget:IWidget = {
	type: WidgetType.FailedVends,
	uid: "dsddsd45789"
}

export interface InitialState{
	widgets: {}
}
