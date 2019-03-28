This guide is for getting **Miniconda** (light weight version of Anaconda) up and running on your local computer and ready for starting a new project. If you have trouble at any point, most if not all the information can be found here: https://conda.io/projects/conda/en/latest/user-guide/getting-started.html

# Installation
Follow the instructions here to download and install Miniconda with Python 3: https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/index.html. You will be using this throughout the workshops. 

## Installing conda on a system with other Python installations
**YOU DO NOT NEED TO UNINSTALL ANY VERSION OF PYTHON YOU CURRENTLY HAVE INSTALLED.**
https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/index.html#installing-conda-on-a-system-that-has-other-python-installations-or-packages

## Confirm installation
To verify that you installed correctly, try to run the Anaconda Navigator (see https://docs.anaconda.com/anaconda/install/verify-install/) Alternatively:
If you have a Mac: try running "conda --version" in a Terminal window. You should be able to see the version of conda you have installed.
If you have Windows: open up Anaconda Prompt
If you get an error message, see: https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-conda.html

# Environments
In every project that you make, you will want to create a separate **'virtual environment'** which will contain only the packages you need for the project. For the workshops, make an environment called *nt-env*.
See here for how to setup and manage an environment with conda: https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-environments

# Managing packages
The main commands related to packages in conda are "search", "list", and "install". More information can be found here: https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-packages

You will need to install the following packages:
- numpy
- matplotlib
- biosppy