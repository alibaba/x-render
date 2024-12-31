export const delay = ms => new Promise(res => setTimeout(res, ms));

export const fakeApi = (url, data) => {
  console.group('request:', url);
  console.log('params:', data);
  console.groupEnd();
  return delay(500).then(res => ({
    success: true,
    message: 'Data fetched successfully',
    data: {
      id: data.id || 'default-id',
      name: 'Sample Node',
      logs: [
        { timestamp: '2023-10-01T10:00:00Z', message: 'Log entry 1' },
        { timestamp: '2023-10-01T11:00:00Z', message: 'Log entry 2' },
      ],
    },
  }));
};
