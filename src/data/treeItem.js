export const treeItem = [
  // root
  {
    id: 1,
    name: 'Root',
    parentId: 0,
  },
  {
    id: 2,
    name: 'item1',
    parentId: 1,
  },
  {
    id: 3,
    name: 'item2',
    parentId: 1,
  },
  {
    id: 4,
    name: 'item3',
    parentId: 1,
  },
  {
    id: 5,
    name: 'item4',
    parentId: 1,
  },
  {
    id: 6,
    name: 'item5',
    parentId: 1,
  },
  {
    id: 9,
    name: 'item6',
    parentId: 6,
  },
  {
    id: 10,
    name: 'item6',
    parentId: 9,
  },
  {
    id: 11,
    name: 'item6',
    parentId: 10,
  },
  {
    id: 12,
    name: 'item6',
    parentId: 10,
  },
  {
    id: 7,
    name: 'item7',
    parentId: 1,
  },
  {
    id: 8,
    name: 'item8',
    parentId: 1,
  },
  // root
  {
    id: 100,
    name: 'root2',
    parentId: 0,
  },
  {
    id: 101,
    name: 'item9',
    parentId: 100,
  },
  {
    id: 102,
    name: 'item10',
    parentId: 100,
  },
];

export const jeusRole = [
  // root
  {
    privileges: ['ROLE_MASTER_READ', 'ROLE_MASTER_WRITE'],
    id: 1,
    name: 'Master',
    parentId: 0,
  },
  {
    privileges: ['ROLE_MASTER_DOMAIN_READ', 'ROLE_MASTER_DOMAIN_WRITE'],
    id: 2,
    name: 'Domain',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_CLUSTER_READ', 'ROLE_MASTER_CLUSTER_WRITE'],
    id: 3,
    name: 'Cluster',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_SERVER_READ', 'ROLE_MASTER_SERVER_WRITE'],
    id: 4,
    name: 'Server',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_SERVERTEMPLATE_READ',
      'ROLE_MASTER_SERVERTEMPLATE_WRITE',
    ],
    id: 5,
    name: 'ServerTemplate',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_RESOURCE_READ', 'ROLE_MASTER_RESOURCE_WRITE'],
    id: 6,
    name: 'Resource',
    parentId: 1,
  },
  {
    privileges: [
      'ROLE_MASTER_RESOURCE_MAIL_READ',
      'ROLE_MASTER_RESOURCE_MAIL_WRITE',
    ],
    id: 9,
    name: 'Mail Resource',
    parentId: 6,
  },
  {
    privileges: [
      'ROLE_MASTER_APPLICATION_READ',
      'ROLE_MASTER_APPLICATION_WRITE',
    ],
    id: 7,
    name: 'Application',
    parentId: 1,
  },
  {
    privileges: ['ROLE_MASTER_STATUS_READ', 'ROLE_MASTER_STATUS_WRITE'],
    id: 8,
    name: 'Status',
    parentId: 1,
  },
  // root
  {
    privileges: ['ROLE_JEUS_READ', 'ROLE_JEUS_WRITE'],
    id: 100,
    name: 'Jeus',
    parentId: 0,
  },
  {
    privileges: ['ROLE_JEUS_OVERVIEW_READ', 'ROLE_JEUS_OVERVIEW_WRITE'],
    id: 101,
    name: 'Overview',
    parentId: 100,
  },
  {
    privileges: ['ROLE_JEUS_SERVER_READ', 'ROLE_JEUS_SERVER_WRITE'],
    id: 102,
    name: 'Server',
    parentId: 100,
  },
];
