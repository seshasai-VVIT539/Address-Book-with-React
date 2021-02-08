export class HomeButton extends React.Component{
  constructor(props) {
      super(props);
      this.clicked=this.clicked.bind(this);
  }
  clicked(){
    this.props.homeClicked();
  }
  render(){
    return (
      undefined
    );
  }
}
