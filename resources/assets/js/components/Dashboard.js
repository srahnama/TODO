import  React, {Component} from 'react';
import  ReactDOM from 'react-dom';
import Tasks from "./Tasks";


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showID: -1,
            active: 1,//active class for nav bar
            menuDisplay: 1,
            list: [],// list of tasks
            list1: [],
            id: 1,// id of todo
            title: 'nothing',
            text: 'nothing',
            filter: 'unfiltered',
            sort: 'unsorted',
        };
        this.getTODO();
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
    // set display
    setDisplay(i){
        this.setState({menuDisplay: i});
        this.getTODO();
    }
    setID(id){
        this.setState({id: id});
    }
    //set filter selection input
    selectChange(e){
        this.setState({
            filter: e.target.value,
        });
        this.getTODO();
    }
    // set sort selection input
    sortChange(e){
        this.setState({
            sort: e.target.value,
        });
        this.getTODO();
    }
    setShowIDTODO(id){
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
    //return save form
    renderSaveTODO(){
        return(
            <div className="col-md-9 row ">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="panel-default">
                            <legend>Add new TODO</legend>
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
                            </div>
                            <button onClick={this.sendTODO.bind(this)} className="btn btn-primary">Submit</button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    //return all of records in li tag
    TODOs(){
        let list = [];
        let list1 = this.state.list;
        list1.forEach((todo)=>{
            list.push(
                <li key={todo.id} className="list-group-item">
                    <div className="row">
                        <div>
                            <div className="col-sm-8">
                                <span className={"label label-"+(
                                    ((todo.status=='new')? 'primary'   : '') +
                                    ((todo.status=='cancelled')? 'danger' : '') +
                                    ((todo.status=='done')? 'success'  : '')+
                                    ((todo.status=='failed')? 'warning'  : '')
                                )}>{todo.status}</span>
                                <span> {todo.title}</span>
                            </div>
                            <div className="col-sm-4 pull-right">
                                <button
                                    onClick={() => {this.setDisplay(2);this.setID(todo.id); }}
                                    className=" btn btn-xs btn-info  glyphicon glyphicon-list"/>
                                {/*<button className=" btn btn-xs btn-info glyphicon glyphicon-edit"></button>*/}
                                <button
                                    onClick={()=>{this.deleteTODO(todo.id)}}
                                    className=" btn btn-xs btn-danger glyphicon glyphicon-trash"/>
                                {
                                    (todo.status != 'new')? '':
                                        <button
                                            onClick={()=>{this.doneTODO(todo.id)}}
                                            className=" btn btn-xs btn-success glyphicon glyphicon-ok"/>
                                }
                                {
                                    (todo.status != 'new') ? '':
                                        <button
                                            onClick={()=>{this.cancelTODO(todo.id)}}
                                            className=" btn btn-xs btn-danger glyphicon glyphicon-remove"/>
                                }
                                {
                                        <button
                                            onClick={()=>{this.setShowIDTODO(todo.id)}}
                                            className=" btn btn-xs btn-default glyphicon glyphicon-eye-open"/>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        (this.state.showID == todo.id)?
                            <div className="jumbotron">
                                <legend> {todo.description}</legend>
                            </div>  : ''
                    }
                </li>
            );
        });
        return list;
    }
    //return list of TODOs in ul tag
    renderTODOList(){
        let lists = this.TODOs();
        return(

            <div className="col-md-9 row ">
                <ul className="list-group">
                    {lists}

                </ul>


            </div>

    )
    }
    //return active section<list TODOs or add new task>
    renderTODO(){
        let menuActive = this.renderTODOList();
        if(this.state.active == 1){menuActive=this.renderTODOList()}
        if(this.state.active == 2){menuActive=this.renderSaveTODO()}
        return(
            <div>
                <div className="panel  ">
                    <span className = "alert alert-success"> Welcom to dashboard!</span>
                </div>
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
                <div className = "panel">
                    <div  className="col-md-3 pull-left">
                        <ul className="list-group">
                            <li onClick={() => {this.setActive(1)}}  className={'list-group-item '+((this.state.active == 1) ? 'active' : '')}><i className='glyphicon glyphicon-list'></i><span>TODO list</span></li>
                            <li onClick={() => {this.setActive(2)}}  className={'list-group-item '+((this.state.active == 2) ? 'active' : '')}><i className='glyphicon glyphicon-plus'></i><span>add TODO </span></li>
                        </ul>
                    </div>
                    {menuActive}
                </div>
            </div>
        );
    }
    //return task template
    renderTasks(){
        return(
            <div>
                <div>
                    <button onClick={()=>{this.setDisplay(1)}} className=" btn btn-xs btn-primary "><i className='glyphicon glyphicon-arrow-left'></i><span>Back</span></button>
                </div>
                <Tasks id={this.state.id}/>
            </div>
        );
    }
    render(){
        let Display = this.renderTODO();
        if(this.state.menuDisplay == 1){Display = this.renderTODO()};
        if(this.state.menuDisplay == 2){Display = this.renderTasks()};
        return(
            <div className = "panel-content">
                {Display}
            </div>
        );
    }
    /******DATABASE FUNCTIONS*******/
    //get tasks from database and sort and filter them
    getTODO(){
        axios.get('/todo').then((response) =>{
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
    sendTODO(){
        // console.log(this.state.title);
        let title = this.state.title;
        let text = this.state.text;
        axios.post('/todo', {
            title: title,
            text : text,
        }).then( (response) => {
            this.getTODO();
            console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    }
    // delete Todo_ on database
    deleteTODO(id){
        axios.delete('/todo/'+id).then( (response) => {
            console.log(response);
            this.getTODO();
        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as delete
    doneTODO(id){
        axios.put('/todo/'+id,{
            status: 'done',
        }).then( (response) => {
            console.log(response);
            this.getTODO();
        }).catch( (error) => {
            console.log(error);
        });
    }
    // update database 'status' field as cancel
    cancelTODO(id){
        axios.put('/todo/'+id,{
            status: 'cancelled',
        }).then( (response) => {
            console.log(response);
            this.getTODO();
        }).catch( (error) => {
            console.log(error);
        });
    }
}

if(document.getElementById('dashboard')){
    ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}