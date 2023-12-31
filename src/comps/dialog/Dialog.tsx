import Box from '@mui/material/Box';
import { Modal, SxProps } from '@mui/material';
import { useAppHooks } from '../../context/hooks';
import SaveDialog from './SaveDialog';
import LoadDialog from './LoadDialog';

const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 200,
    sm: 400,
  },
  bgcolor: '#0f1924',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  fontSize: {
    xs: '8px',
    sm: '10px',
    md: '14px',
  },
};

export default function BasicModal() {
  const { saveDialog, loadDialog } = useAppHooks();

  return (
    <div>
      <Modal
        open={saveDialog || loadDialog}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <>
            {saveDialog && <SaveDialog />}
            {loadDialog && <LoadDialog />}
          </>
        </Box>
      </Modal>
    </div>
  );
}
