import * as React from 'react';
import Title from './Title';
import GeneralInfoPanel from './GeneralInfoPanel';
import UnfinishedBanner from './UnfinishedBanner';
import NameInput from './NameInput';
import NameResolve from './NameResolve';

const ContainerTabPaneActive = ({ children }) => (
  <section className="container">
    <div className="tab-content">
      <main className="tab-pane active">
        <section role="main" className="row">
          {children}
        </section>
      </main>
    </div>
  </section>
);

interface Props {
  ensState: {};
  resolveDomainRequested(domain: string): void;
}
const ENS = (props: Props) => {
  return (
    <ContainerTabPaneActive>
      <UnfinishedBanner />
      <Title />
      <NameInput resolveDomainRequested={props.resolveDomainRequested} />
      <NameResolve {...props.ensState} />
      <GeneralInfoPanel />
    </ContainerTabPaneActive>
  );
};

export default ENS;
