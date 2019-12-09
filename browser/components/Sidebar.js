import React from 'react';


class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-xs-2" >
        <sidebar>
          <div>
            <em><h4>Find the nearest:</h4></em>
          </div>
          <select className="form-control" onChange={this.props.typeChange}>
            <option value='restaurant'>Restaurant</option>
            <option value='bar'>Bar</option>
            <option value='cafe'>Cafe</option>
            <option value='pharmacy'>Pharmacy</option>
            <option value='bank'>Bank</option>
            <option value='atm'>ATM</option>
            <option value='lodging'>Hotel</option>
            <option value='hospital'>Hospital</option>
            <option value='train-station'>Train Station</option>
            <option value='airport'>Airport</option>
            <option value='taxi_stand'>Taxi Stand</option>
          </select>
          <hr />
          <select className="form-control" onChange={this.props.filterChange}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value="11">11</option>
          </select>
          <hr />
          {this.props.selected && (
            <div>
              <h4>{this.props.selected.name}</h4>
              <button type='button' className='success' onClick={() => this.props.handleDirectionClick()}>Directions</button>
            </div>
          )}
        </sidebar>
      </div>
    );
  }
}

export default Sidebar;
