const React = require('react');
class Show extends React.Component {
    render () {
        const vegtable = this.props.vegtable;

        return (
            <div>
                <h1>Show Page</h1>
                <h2>   <a href={'/vegtables'}>Back to Index page</a> </h2>
                <p>The {vegtable.name} is {vegtable.color}</p>
                {vegtable.readyToEat? 'Its is ready to eat' : 'It is not ready to eat... Cant touch this' }
            </div>

        )
    }
}

module.exports = Show;