import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/OrkutCommons';
import { RelationsBoxWrapper } from '../src/components/Relations';

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.gitUser}.png`} style={{ borderRadius: '8px' }}></img>
    </Box>
  )
}

export default function Home() {
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
      <AlurakutMenu></AlurakutMenu>
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
        </div>
        <div className="relationsArea" style={{ gridArea: 'relationsArea' }}>
          <RelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({amigos.length})
            </h2>

            <ul>
              {amigos.map((pessoas) => {
                return (
                  <li>
                    <a href={`/users/${pessoas}`} key={pessoas}>
                      <img src={`https://github.com/${pessoas}.png`} />
                      <span>{pessoas}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </RelationsBoxWrapper>

          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}