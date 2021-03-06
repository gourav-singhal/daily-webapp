import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { size2, size6, size8 } from '../../styles/sizes';
import DailyDevLogo from '../svg/DailyDevLogo';
import { InvertButton, TextButton } from '../Buttons';
import XIcon from '../../icons/x.svg';
import GitHubIcon from '../../icons/github.svg';
import { typoJr } from '../../styles/typography';
import { StyledModal, ModalCloseButton, Props } from './StyledModal';
import { privacyPolicy, termsOfService } from '../../lib/constants';
import { LegalNotice } from '../utilities';
import { useRouter } from 'next/router';

const MyModal = styled(StyledModal)`
  .Modal {
    padding: ${size8};

    .logo {
      width: 9.25rem;
    }
  }

  ${LegalNotice} {
    max-width: 17.25rem;
    margin-top: ${size8};
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;

  ${TextButton} {
    margin: ${size2} 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Content = styled.div`
  margin: ${size6} 0 ${size8};
  color: var(--theme-secondary);
  text-align: center;
  ${typoJr}
`;

export default function LoginModal(props: Props): ReactElement {
  // eslint-disable-next-line react/prop-types
  const { onRequestClose } = props;
  const router = useRouter();

  const authUrl = (provider: string, redirectUri: string) =>
    `/api/v1/auth/authorize?provider=${provider}&redirect_uri=${encodeURI(
      redirectUri,
    )}&skip_authenticate=true&register_mode=${
      router.query.author ? 'author' : 'default'
    }`;

  const login = async (provider: string) => {
    const redirectUri = `${window.location.origin}${window.location.pathname}`;
    window.location.href = authUrl(provider, redirectUri);
  };

  return (
    <MyModal {...props}>
      <ModalCloseButton onClick={onRequestClose}>
        <XIcon />
      </ModalCloseButton>
      <DailyDevLogo />
      <Content>
        Our developer&apos;s community care about the content, log in to show
        yourself.
      </Content>
      <Buttons>
        <InvertButton onClick={() => login('github')}>
          <GitHubIcon />
          Sign in with GitHub
        </InvertButton>
        <InvertButton onClick={() => login('google')}>
          <img src="/google.svg" className="icon" alt="Google logo" />
          Sign in with Google
        </InvertButton>
      </Buttons>
      <LegalNotice>
        By signing up I accept the{' '}
        <a href={termsOfService} target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{' '}
        and the{' '}
        <a href={privacyPolicy} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </LegalNotice>
    </MyModal>
  );
}
