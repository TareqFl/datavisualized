import { Check } from '@mui/icons-material';
import { Typography, LinearProgress, Stack, Button } from '@mui/material';
import React from 'react';
import { useAppHooks } from '../../context/hooks';
import { saveData } from '../../utils/utils';
const SaveDialog = () => {
  const { setSaveDialog, channels, channelsData } = useAppHooks();
  const [saving, setSaving] = React.useState<true | null | false>(false);

  const LoadingStatus = () => {
    React.useEffect(() => {
      let timeOut = setTimeout(() => {
        setSaving(true);
      }, 2000);

      return () => {
        clearTimeout(timeOut);
      };
    }, [saving]);
    return (
      <>
        <Typography textAlign={'center'}>Saving...</Typography>
        <LinearProgress />
      </>
    );
  };

  const AwaitingSave = () => {
    // Handlers
    const handleSave = () => {
      if (channelsData !== null) {
        saveData(channelsData);

        return setSaving(null);
      }
      return;
    };

    return (
      <>
        <Button onClick={handleSave}>Save</Button>
        <Button fullWidth onClick={() => setSaveDialog(false)}>
          Cancel
        </Button>
      </>
    );
  };

  const SavedSuccess = () => {
    React.useEffect(() => {
      let timeOut = setTimeout(() => {
        setSaveDialog(false);
      }, 1000);

      return () => {
        clearTimeout(timeOut);
      };
    }, [saving]);

    return (
      <Button color='success' endIcon={<Check />}>
        Done
      </Button>
    );
  };

  return (
    <Stack gap={2}>
      <Typography color={'white'}>File: Data{`(v1)`}</Typography>
      <Typography color={'white'}>number of Channels: {channels}</Typography>
      <>
        {saving === false && <AwaitingSave />}
        {saving === null && <LoadingStatus />}
        {saving === true && <SavedSuccess />}
      </>
    </Stack>
  );
};

export default SaveDialog;
