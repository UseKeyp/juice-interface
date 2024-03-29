import { t } from '@lingui/macro'
import { Layout, Menu, MenuProps, Space } from 'antd'
import Loading from 'components/Loading'
import { ProjectHeader } from 'components/Project/ProjectHeader'
import { V2V3ProjectHeaderActions } from 'components/v2v3/V2V3Project/V2V3ProjectHeaderActions'
import { ProjectSettingsContent } from 'components/v2v3/V2V3Project/V2V3ProjectSettings/ProjectSettingsContent'
import { FEATURE_FLAGS } from 'constants/featureFlags'
import { ProjectMetadataContext } from 'contexts/projectMetadataContext'
import { ThemeContext } from 'contexts/themeContext'
import { V2V3ProjectContext } from 'contexts/v2v3/V2V3ProjectContext'
import { useIsUserAddress } from 'hooks/IsUserAddress'
import useMobile from 'hooks/Mobile'
import { V2V3SettingsPageKey } from 'models/menu-keys'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { featureFlagEnabled } from 'utils/featureFlags'
import { pushMenuContent, v2v3ProjectRoute } from 'utils/routes'
import { BackToProjectButton } from '../../../BackToProjectButton'

type MenuItem = Required<MenuProps>['items'][number]

export const V2V3SettingsPageKeyTitleMap: {
  [k in V2V3SettingsPageKey]: string
} = {
  general: t`General`,
  projecthandle: t`Project handle`,
  reconfigurefc: t`Reconfigure Funding Cycle`,
  payouts: t`Payouts`,
  reservedtokens: t`Reserved token allocation`,
  v1tokenmigration: t`V1 token migration`,
  transferownership: t`Transfer ownership`,
  archiveproject: t`Archive project`,
  governance: t`Governance`,
  upgrades: t`Project upgrades`,
}

function menuItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: 'group' | 'divider',
  className?: string,
): MenuItem {
  return {
    key,
    children,
    label,
    type,
    className,
  }
}

const items: MenuItem[] = [
  menuItem(
    'Project',
    'project',
    [
      menuItem('General', 'general', undefined, undefined, 'menu-item-sider'),
      menuItem(
        'Project handle',
        'projecthandle',
        undefined,
        undefined,
        'menu-item-sider',
      ),
    ],
    'group',
  ),
  menuItem('', 'div1', undefined, 'divider'),
  menuItem(
    'Funding',
    'funding',
    [
      menuItem(
        'Funding cycle',
        'reconfigurefc',
        undefined,
        undefined,
        'menu-item-sider',
      ),
      menuItem('Payouts', 'payouts', undefined, undefined, 'menu-item-sider'),
      menuItem(
        'Reserved tokens',
        'reservedtokens',
        undefined,
        undefined,
        'menu-item-sider',
      ),
    ],
    'group',
  ),
  menuItem('', 'div2', undefined, 'divider'),
  menuItem(
    'Manage',
    'manage',
    [
      menuItem(
        'Transfer ownership',
        'transferownership',
        undefined,
        undefined,
        'menu-item-sider',
      ),
      menuItem(
        'Archive project',
        'archiveproject',
        undefined,
        undefined,
        'menu-item-sider',
      ),
      menuItem(
        'Governance',
        'governance',
        undefined,
        undefined,
        'menu-item-sider',
      ),
      featureFlagEnabled(FEATURE_FLAGS.PROJECT_CONTRACT_UPGRADES)
        ? menuItem(
            'Project upgrades',
            'upgrades',
            undefined,
            undefined,
            'menu-item-sider',
          )
        : null,
      featureFlagEnabled(FEATURE_FLAGS.V1_TOKEN_SWAP)
        ? menuItem(
            'V1 token migration',
            'v1tokenmigration',
            undefined,
            undefined,
            'menu-item-sider',
          )
        : null,
    ],
    'group',
  ),
]

export function V2V3ProjectSettings() {
  const { isPreviewMode, projectOwnerAddress, handle } =
    useContext(V2V3ProjectContext)
  const { projectId, projectMetadata } = useContext(ProjectMetadataContext)
  const { isDarkMode } = useContext(ThemeContext)

  const [collapsed, setCollapsed] = useState<boolean>(false)

  const router = useRouter()
  const isOwner = useIsUserAddress(projectOwnerAddress)
  const isMobile = useMobile()

  const canEditProjectHandle = isOwner && !isPreviewMode && !handle
  const activeSettingsPage = router.query.page as V2V3SettingsPageKey

  const handleMenuItemClick = (item: MenuItem) => {
    const key = item?.key as V2V3SettingsPageKey | undefined
    if (!key) return

    pushMenuContent(router, key)

    if (isMobile) {
      setCollapsed(true)
    }
  }

  if (!projectMetadata) {
    return <Loading />
  }

  return (
    <div className="my-0 mx-auto max-w-[1080px] p-5">
      <Space direction="vertical" size={40} className="w-full">
        <ProjectHeader
          actions={!isPreviewMode ? <V2V3ProjectHeaderActions /> : undefined}
          handle={handle}
          projectOwnerAddress={projectOwnerAddress}
          canEditProjectHandle={canEditProjectHandle}
          hideDescription={isMobile}
        />
        <Layout className="mb-16 min-h-screen w-full bg-transparent">
          <Layout.Sider
            className="settings-layout mr-12 bg-transparent"
            breakpoint="lg"
            width={200}
            collapsedWidth="0"
            collapsed={collapsed}
            onCollapse={setCollapsed}
          >
            <Space direction="vertical" size="middle" className="w-full">
              <BackToProjectButton
                projectPageUrl={v2v3ProjectRoute({ projectId, handle })}
              />
              <Menu
                defaultOpenKeys={['project', 'funding', 'manage']}
                defaultSelectedKeys={[activeSettingsPage]}
                mode="inline"
                theme={isDarkMode ? 'dark' : 'light'}
                items={items}
                onSelect={handleMenuItemClick}
              />
            </Space>
          </Layout.Sider>

          <ProjectSettingsContent />
        </Layout>
      </Space>
    </div>
  )
}
