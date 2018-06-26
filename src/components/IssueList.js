import React from 'react';
import IssueItem from './IssueItem';
export default class IssueList extends React.Component {
  static defaultProps = {
    title: '', //issue의 title
    deadline: '1111', // issue의 기한
    label: '라벨', // issue의 라벨
    progress: '', // issue의 진척상황
  };
  render() {
    const { issues } = this.props;
    console.log(issues);
    return issues.map(issue => (
      <tbody>
        <IssueItem
          key={issue.id}
          title={issue.title}
          deadline={issue.deadline}
          label={issue.label}
          progress={issue.progress}
          id={issue.id}
        />
      </tbody>
    ));
  }
}
