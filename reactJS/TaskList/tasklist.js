class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state = { text: '' }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e){
        this.setState({text: e.target.value});
    }

    handleAddTask(){
        let text = this.state.text;

        let newTask = {
            id: Date.now(),
            text: text,
            isChecked: false
        }

        this.props.onTaskAdd(newTask);
        this.setState({ text: '' });
    }

    render(){
        return(
            <div className="add-task">
                <input type="text" onChange={this.handleTextChange} value={this.state.text} />
                <button onClick={this.handleAddTask}>Add</button>
            </div>
        );
    }
}


class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="checkbox" defaultChecked={this.props.checked} onChange={this.props.handleTaskCheck} />
                <label>{this.props.text}</label>
            </div>
        );
    }
}


class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onTaskCheck = this.props.onTaskCheck;
        return (
            this.props.tasks.map((task) => <Task key={task.id} text={task.text} checked={task.isChecked} handleTaskCheck={onTaskCheck.bind(null, task)}/>)
        )
    }
}


class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleCompletedTasks = this.handleCompletedTasks.bind(this);
    }

    handleCompletedTasks(e) {
        e.preventDefault();
        var CompletedTasks = this.props.tasks.filter((task) => task.isChecked === true);
        this.setState({ tasks: CompletedTasks });
    }

    render() {
        return (
            <div className="filter">
                <a href="#" onClick={() => this.props.onTaskFilter(null)}>All</a>
                <a href="#" onClick={() => this.props.onTaskFilter(false)}>New</a>
                <a href="#" onClick={() => this.props.onTaskFilter(true)}>Completed</a>
            </div>
        );
    }
}


class TasksApp extends React.Component {
    constructor(props) {
        super(props);
        this.TASKS = [
            {
                id: 1,
                text: 'Oranges'
            }, {
                id: 2,
                text: 'Mandarines'
            }, {
                id: 3,
                text: 'Potato'
            }, {
                id: 4,
                text: 'Carrots'
            }, {
                id: 5,
                text: 'Tomatoes'
            }, {
                id: 6,
                text: 'Aubergines'
            }, {
                id: 7,
                text: 'Broccoli'
            }, {
                id: 8,
                text: 'Cheese'
            }
        ];
        this.state = { hiddentasks: [], tasks: [] };
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleTaskCheck = this.handleTaskCheck.bind(this);
        this.handleNewTasks = this.handleNewTasks.bind(this);
    }
    componentDidMount(){
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        if(localTasks){
            this.setState({ hiddentasks: localTasks, tasks: localTasks});
        }
    }

    componentDidUpdate(){
        this._updateLocalStorage();
    }

    handleTaskAdd(newTask){
        let newTasks = this.state.tasks.slice();
        newTasks.unshift(newTask);
        this.setState({ hiddentasks: newTasks, tasks: newTasks });
    }

    handleTaskCheck(task){
        const taskId = task.id;
        let tasksChanged = this.state.tasks.map((el) => this.changeTaskStatus(el, taskId));
        this.setState({ hiddentasks: tasksChanged, tasks: tasksChanged });
    }

    changeTaskStatus(el, taskId){
        if (taskId === el.id) {
            let checked = (el.isChecked === false) ? true : false;
            el.isChecked = checked;
        } 
        return el;
    }

    handleNewTasks(status) {
        let AllTasks = this.state.hiddentasks.slice();
        switch(status){
            case null:  this.setState({ tasks: AllTasks }); 
                        break;

            case false: let NewTasks = AllTasks.filter((task) => { if (task.isChecked === false) return task; }); 
                        this.setState({ tasks: NewTasks }); 
                        break;

            case true:  let CompletedTasks = AllTasks.filter((task) => { if (task.isChecked === true) return task; }); 
                        this.setState({ tasks: CompletedTasks }); 
                        break;
        }
    }

    render() {
        return (
            <div>
                <AddTask onTaskAdd={this.handleTaskAdd}/>
                <TaskList tasks={this.state.tasks} onTaskCheck={this.handleTaskCheck} />
                <Filter onTaskFilter={this.handleNewTasks} />
            </div>           
        );
    }

    _updateLocalStorage(){
        let tasks = JSON.stringify(this.state.hiddentasks);
        localStorage.setItem('tasks', tasks);
    }
}

ReactDOM.render(
    <TasksApp />,
    document.getElementById('root')
);

