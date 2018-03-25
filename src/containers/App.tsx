import * as React from 'react';
import { auth } from 'database/firebase';
import Main from 'components/router/Main';
import MainLoading from 'components/MainLoading';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';

interface RouteProps {
  history: {
    push: ((path: string) => void);
  };
  location: {
    pathname: string;
  };
}
interface AppProps {}

interface AppState {
  loading: Boolean;
  user: {} | null;
}
class App extends React.Component<AppProps & RouteProps, AppState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    // const { user } = this.state;

    // setTimeout(() => {
    //   if (!user) {
    //     this.props.history.push('/dashboard');

    //     this.setState({
    //       user: { uid: 'asdklfnkasdlflk' },
    //       loading: false
    //     });
    //   } else {
    //     this.props.history.push('/');

    //     this.setState({
    //       user: null,
    //       loading: false
    //     });
    //   }
    // }, 3500);
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: object | null): void => {
      if (currentUser) {
        this.props.history.push('/dashboard');
        console.log('currentUser data setting');
        console.log(currentUser);
      } else {
        this.props.history.push('/');
      }

      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div className="wtd">
        {loading ? <MainLoading /> : <Main user={user} />}
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default withRouter(App);
