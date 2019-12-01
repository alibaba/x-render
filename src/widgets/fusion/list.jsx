import { Button, Icon } from '@alifd/next';
import listHoc from '../../components/listHoc';

class FrButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { icon } = this.props;
    let iconName;
    switch (icon) {
      case 'file-add':
        iconName = 'add';
        break;
      case 'delete':
        iconName = 'ashbin';
        break;
      default:
        iconName = icon;
        break;
    }
    return (
      <Button {...this.props}>
        {iconName ? <Icon type={iconName} /> : null}
        {this.props.children}
      </Button>
    );
  }
}

export default listHoc(FrButton);
