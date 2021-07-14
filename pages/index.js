import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/OrkutCommons';
import { RelationsBoxWrapper } from '../src/components/Relations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.gitUser}.png`} style={{ borderRadius: '8px' }}></img>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitUser}`}>
          @{propriedades.gitUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
      id: '15156156564561',
      title: 'Eu Odeio Acordar Cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
    id: '151561561',
    title: 'Grand Chase',
    image: 'https://pbs.twimg.com/profile_images/1410080759378022402/MpcsJ4KP_400x400.jpg'
  }
]);
  const gitUser = 'camp0sFer';
  const amigos = [
    'fbianca',
    'juunegreiros',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu githubUser={gitUser}></AlurakutMenu>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitUser={gitUser}></ProfileSidebar>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL da capa"
                  name="image"
                  aria-label="Coloque a URL da capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="relationsArea" style={{ gridArea: 'relationsArea' }}>
          <RelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({amigos.length})
            </h2>

            <ul>
              {amigos.map((pessoas) => {
                return (
                  <li key={pessoas}>
                    <a href={`/users/${pessoas}`}>
                      <img src={`https://github.com/${pessoas}.png`} />
                      <span>{pessoas}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </RelationsBoxWrapper>
          <RelationsBoxWrapper>
          <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
          <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </RelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}