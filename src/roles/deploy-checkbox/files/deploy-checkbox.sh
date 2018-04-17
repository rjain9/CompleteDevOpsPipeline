#!/bin/sh
export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i /home/ubuntu/templates/checkbox_inventory /home/ubuntu/CSC519DevOps-Project/src/deploy-checkbox.yml