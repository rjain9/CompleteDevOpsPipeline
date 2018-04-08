#!/bin/sh
export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i /home/ubuntu/templates/itrust_inventory /home/ubuntu/CSC519DevOps-Project/src/deploy-itrust.yml