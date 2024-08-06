import { DeleteOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons'
import DragableList from '@renderer/components/DragableList'
import { Box, HStack } from '@renderer/components/Layout'
import { TopView } from '@renderer/components/TopView'
import { useAgents } from '@renderer/hooks/useAgents'
import { Empty, Modal, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import AddAgentPopup from './AddAgentPopup'

const PopupContainer: React.FC = () => {
  const [open, setOpen] = useState(true)
  const { t } = useTranslation()
  const { agents, removeAgent, updateAgents } = useAgents()

  const onOk = () => {
    setOpen(false)
  }

  const onCancel = () => {
    setOpen(false)
  }

  const onClose = async () => {
    ManageAgentsPopup.hide()
  }

  useEffect(() => {
    if (agents.length === 0) {
      setOpen(false)
    }
  }, [agents])

  return (
    <Modal
      style={{ marginTop: '10vh' }}
      title={t('agents.manage.title')}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      afterClose={onClose}
      footer={null}>
      <Container>
        {agents.length > 0 && (
          <DragableList list={agents} onUpdate={updateAgents}>
            {(item) => (
              <AgentItem>
                <Box mr={8}>
                  {item.emoji} {item.name}
                </Box>
                <HStack gap="15px">
                  <Popconfirm
                    title={t('agents.delete.popup.content')}
                    okButtonProps={{ danger: true }}
                    onConfirm={() => removeAgent(item)}>
                    <DeleteOutlined style={{ color: 'var(--color-error)' }} />
                  </Popconfirm>
                  <EditOutlined style={{ cursor: 'pointer' }} onClick={() => AddAgentPopup.show(item)} />
                  <MenuOutlined style={{ cursor: 'move' }} />
                </HStack>
              </AgentItem>
            )}
          </DragableList>
        )}
        {agents.length === 0 && <Empty description="" />}
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  padding: 16px;
  height: 50vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const AgentItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
  user-select: none;
  background-color: var(--color-background-soft);
  margin-bottom: 8px;
  .anticon {
    font-size: 16px;
    color: var(--color-icon);
  }
  &:hover {
    background-color: var(--color-background-mute);
  }
`

export default class ManageAgentsPopup {
  static topviewId = 0
  static hide() {
    TopView.hide('ManageAgentsPopup')
  }
  static show() {
    TopView.show(<PopupContainer />, 'ManageAgentsPopup')
  }
}
