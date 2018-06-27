import React from 'react';
import { IssueConsumer } from '../contexts/IssueContext';
import { Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts/UserContext';
export default class DeleteIssueButtonContainer extends React.Component {
  static defaultProps = {
    projectId: null, //해당 이슈의 프로젝트 아이디
  };
  state = {
    redirect: false,
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/project/${this.props.projectId}`} />;
    } else {
      return (
        <IssueConsumer>
          {({ deleteIssue, projectId, issue }) => (
            <UserConsumer>
              {({ userId }) =>
                issue.userId === userId ? (
                  <button
                    onClick={async e => {
                      await deleteIssue();
                      this.setState({
                        redirect: true,
                      });
                    }}
                  >
                    삭제
                  </button>
                ) : null
              }
            </UserConsumer>
          )}
        </IssueConsumer>
      );
    }
  }
}
