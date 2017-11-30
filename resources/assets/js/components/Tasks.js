import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Tasks extends Component{

    constructor(props) {
        super(props);
        let date = new Date();
        let d = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay();
        this.state = {

            active: 1,
            menuDisplay: 1,
            list: [],// list of tasks
            list1: [],
            id: 1,
            title: 'nothing',
            text: 'nothing',
            time: d,
            filter: 'unfiltered',
            sort: 'unsorted',
        };
        this.getTask();
        this.inputChange = this.inputChange.bind(this);
        this.textareaChange = this.textareaChange.bind(this);
    }
    componentDidUpdate(){
    }
    componentWillMount(){
    }
    componentDidMount(){
        this.setState({list1:this.state.list});
    }
    setActive(i){
        this.setState({ active: i});
    }
    // set title
    inputChange(e){
        this.setState({title: e.target.value});
    }
    //set description
    textareaChange(e){
        this.setState({text: e.target.value});
    }
    //set time
    datetimeChange(e){
        this.setState({time: e.target.value});
    }
    // set display
    setDisplay(i){
        this.setState({menuDisplay: i});
    }
    setID(id){
        this.setState({id: id});
    }
    //set filter selection input
    selectChange(e){
        this.setState({
            filter: e.target.value,
        });
        this.getTask();
    }
    // set sort selection input
    sortChange(e){
        this.setState({
            sort: e.target.value,
        });
        this.getTask();
    }
    setShowIDTask(id){
        if(this.state.showID == id){
            this.setState({
                showID: -1,
            });
        }
        else{
            this.setState({
                showID: id,
            });
        }
    }

    /******Render Functions*********/
    // return all of records in li tag
    Tasks(){
        let list = [];
        let list1 = this.state.list;
        list1.forEach((task)=>{
            let isSoon = (this.setFaildTask(task))? 'red': '';
            const divStyle = {
                background: isSoon,
            };
            list.push(
                <li style={divStyle} id={task.id} className="list-group-item">
                    <div className="row">
                        <div>
                            <div className="col-sm-8">
                                <span className={"label label-"+(
                                    ((task.status=='new')? 'primary'   : '') +
                                    ((task.status=='cancelled')? 'danger' : '') +
                                    ((task.status=='failed')? 'warning' : '') +
                                    ((task.status=='done')? 'success'  : '')
                                )}>{task.status}</span>
                                <span> {task.title}</span>
                            </div>
                            <div className="col-sm-4 pull-right">
                               <button
                                    onClick={()=>{this.deleteTask(task.id)}}
                                    className=" btn btn-xs btn-danger glyphicon glyphicon-trash"/>
                                {
                                    (task.status != 'new')? '':
                                        <button

                                            onClick={()=>{this.doneTask(task.id)}}
                                            className=" btn btn-xs btn-success glyphicon glyphicon-ok"/>
                                }
                                {
                                    (task.status != 'new') ? '':
                                        <button
                                            onClick={()=>{this.cancelTask(task.id)}}
                                            className=" btn btn-xs btn-danger glyphicon glyphicon-remove"/>
                                }
                                {
                                    <button
                                        onClick={()=>{this.setShowIDTask(task.id)}}
                                        className=" btn btn-xs btn-default glyphicon glyphicon-eye-open"/>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        (this.state.showID == task.id)?
                            <div className="jumbotron">
                                <legend> {task.description}</legend>
                            </div>  : ''
                    }
                </li>
            );
        });
        return list;
    }
    //return list of tasks in ul tag
    renderTaskList(){
        let lists = this.Tasks();
        return(
            <div className="col-md-9 row ">
                <ul className="list-group">
                    {lists}
                </ul>
            </div>
        )
    }
    // return active section<list taks or add new task>
    renderTask() {
        let menuActive = this.renderTaskList();
        if(this.state.active == 1){menuActive=this.renderTaskList()}
        if(this.state.active == 2){menuActive=this.renderSaveTask()}
        return(
            <div className = "panel">
                <div  className="col-md-3 pull-left">
                    <ul className="list-group">
                        <li onClick={() => {this.setActive(1)}}  className={'list-group-item '+((this.state.active == 1) ? 'active' : '')}><i className='glyphicon glyphicon-list'></i><span>Task list</span></li>
                        <li onClick={() => {this.setActive(2)}}  className={'list-group-item '+((this.state.active == 2) ? 'active' : '')}><i className='glyphicon glyphicon-plus'></i><span>add Task </span></li>
                    </ul>
                </div>
                {menuActive}
            </div>
        );
    }
    //@return save form
    renderSaveTask(){
        return(
            <div className="col-md-9 row ">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="panel-default">

                            <legend>Add new Task</legend>

                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={this.inputChange.bind(this)}
                                />

                                <label htmlFor="">Description</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.text}
                                    onChange={this.textareaChange.bind(this)}
                                />
                                <label htmlFor="">Due time:</label>
                                <input id="date"
                                       value={this.state.time}
                                       onChange={this.datetimeChange.bind(this)}
                                       type="date" />
                            </div>

                            <button onClick={this.sendTask.bind(this)} className="btn btn-primary">Submit</button>

                        </div>
                    </li>

                </ul>


            </div>
        )
    }
    render(){
        let Display = this.renderTask();
        if(this.state.menuDisplay == 1){Display = this.renderTask()};
        if(this.state.menuDisplay == 2){Display = this.renderTasks()};
        return(
            <div className = "panel-content">
                <div className="panel-default pull-right">
                    <select
                        defaultValue={this.state.filter}
                        onChange={this.selectChange.bind(this)}
                        className="form-control">
                        <option >unfiltered</option>
                        <option >new</option>
                        <option >cancelled</option>
                        <option >done</option>
                        <option >failed</option>
                    </select>
                </div>
                <div className="panel-default pull-right">
                    <select
                        defaultValue={this.state.filter}
                        onChange={this.sortChange.bind(this)}
                        className="form-control">
                        <option >unsorted</option>
                        <option >new first</option>
                        <option >old first</option>
                    </select>
                </div>
                {Display}
            </div>
        );
    }
    /******DATABASE FUNCTIONS*******/
    //get tasks from database and sort and filter them
    getTask(){
        axios.get('/task/'+this.props.id).then((response) =>{
            console.log(this.state.filter);
            if(this.state.filter == 'unfiltered'){
                if(this.state.sort == 'unsorted')
                {
                    this.setState({
                        list: response.data.list
                    })
                }
                else {
                    this.setState({
                        list: (response.data.list).sort((a, b) =>{
                            if(this.state.sort == 'new first') {return a.id < b.id;}
                            if(this.state.sort == 'old first') {return a.id > b.id;}
                        })
                    })
                }

            }
            else {
                if(this.state.sort == 'unsorted')
                {
                    this.setState({
                        list: (response.data.list).filter(item => item.status == this.state.filter)//response.data.list
                    });
                }
                else {
                    this.setState({
                        list: ((response.data.list).filter(item => item.status == this.state.filter)).sort((a, b) =>{
                            if(this.state.sort == 'new first') {return a.id < b.id;}
                            if(this.state.sort == 'old first') {return a.id > b.id;}
                        })
                    })
                }

            }
        })
    }
    // save task on database
    sendTask(){
        let title = this.state.title;
        let text = this.state.text;
        let time = this.state.time;
        axios.post('/task', {
            title: title,
            text : text,
            time : time.replace('T',' '),
            todo_list_id : this.props.id,
        }).then( (response) => {
            this.getTask();
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    // delete task on database
    deleteTask(id){
        axios.delete('/task/'+id).then( (response) => {
            console.log(response);
            this.getTask();
        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as done
    doneTask(id){
        axios.put('/task/'+id,{
            status: 'done',
        }).then( (response) => {
            console.log(response);
            this.getTask();
        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as failed on task table
    failedTask(id){
        axios.put('/task/'+id,{
            status: 'failed',
        }).then( (response) => {
            console.log(response);
            this.getTask();
        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as failed on todo lists tabel
    failedTODO(id){
        axios.put('/todo/'+id,{
            status: 'failed',
        }).then( (response) => {
            console.log(response);

        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as cancel
    cancelTask(id){
        axios.put('/task/'+id,{
            status: 'cancelled',
        }).then( (response) => {
            console.log(response);
            this.getTask();
        }).catch( (error) => {
            console.log(error);
        });
    }

    /*****
     * Check difference between current date and task date
     * if task  expired date Task table status field will be 'failed'
     * and TODO_LIST table status field too, and check if dates difference
     * less than 7 days return true else return false for changing background
     * task color to red
     *
     *
     * *******/
    setFaildTask(task){
        var date1 = new Date(task.due_date);
        var date2 = new Date(Date.now());
        var diffDays = this.dateDiffInDays(date1, date2);
        if(task.status == 'new'){
            if (diffDays < 0 ){this.failedTask(task.id);this.failedTODO(this.props.id);}
            else {
                if ( diffDays  < 7 ){
                    console.log('ok');
                    return true;
                }
            }
        }
        return false;
    }
    // a and b are javascript Date objects
    // return difference between two dates by using 'moment' library.
    dateDiffInDays(a, b) {
        let moment = require('moment');
        moment().format();
        // Discard the time and time-zone information.
        let c = moment([a.getFullYear(), a.getMonth(), a.getDate()]);
        let d = moment([b.getFullYear(), b.getMonth(), b.getDate()]);
        return c.diff(d, 'days');
    }

}
