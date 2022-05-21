import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core'
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import uploadStyles from "../sass/upload.module.scss"

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme, img: any) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={{ accepted: img !== null, rejected: false }} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      {img ? (
        <>
          <Text size="xl" inline>
            {img.name}
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            You selected the file, you can change it if you want
          </Text>
        </>
      ) : (
        <>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach only one file, the file should not exceed 16mb
          </Text>
        </>
      )}
    </div>
  </Group>
);

export default function StyledDropzone({ img, setImg }: { img: any, setImg: React.Dispatch<any> }) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      className={uploadStyles.dropzone}
      onDrop={(files) => {
        setImg(files[0])
        showNotification({
          autoClose: 5000,
          title: "File Selected",
          message: `You selected the file ${files[0].name}`,
          color: 'green',
        })
      }}
      onReject={() => {
        showNotification({
          autoClose: 5000,
          title: "File Was Not Selected",
          message: "An error occurred, try again",
          color: 'red',
        })
      }}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
    >
      {(status) => dropzoneChildren(status, theme, img)}
    </Dropzone>
  );
}