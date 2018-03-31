#!/bin/sh
export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i /home/vagrant/templates/itrust_inventory /home/vagrant/CSC519DevOps-Project/src/deploy-itrust.yml